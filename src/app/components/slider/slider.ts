import { trigger, state, style, transition, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

export interface SlideItem {
  title: string;
  description?: string;
  action?: {
    text: string;
    url: string;
  };
}

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
  animations: [
    trigger('blockSlide', [
      state(
        'hidden',
        style({
          width: '0%',
          left: '0%',
        })
      ),
      state(
        'covering',
        style({
          width: '100%',
          left: '0%',
        })
      ),
      state(
        'revealing',
        style({
          width: '0%',
          left: '100%',
        })
      ),
      transition('hidden => covering', [animate('600ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('covering => revealing', [animate('600ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('revealing => hidden', [animate('0ms')]),
    ]),
    trigger('fadeText', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(10px)',
        })
      ),
      transition('hidden => visible', [animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('visible => hidden', [animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')]),
    ]),
  ],
})
export class Slider implements AfterViewInit, OnDestroy {
  items = input.required<SlideItem[]>();
  leadingText = input<string>('');
  animationDuration = input<number>(4000);
  caseInsensitiveTitle = input<boolean>(false);
  textual = input<boolean>(false);

  private readonly elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  titleMeasure = viewChild.required<ElementRef>('titleMeasure');

  private slideAnimationSubscription?: Subscription;
  private intersectionObserver?: IntersectionObserver;

  private readonly isVisible = signal(false);
  currentItemIndex = signal(0);
  blockAnimationState = signal<'hidden' | 'covering' | 'revealing'>('hidden');
  private animationWidth = signal<string>('auto');
  descriptionAnimationState = signal<'visible' | 'hidden'>('visible');
  descriptionBlockAnimationState = signal<'hidden' | 'covering' | 'revealing'>('hidden');

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.stopSlideAnimation();
    this.intersectionObserver?.disconnect();
  }

  currentItem = computed(() => {
    const items = this.items();
    const index = this.currentItemIndex();
    return items.length > 0 && index >= 0 && index < items.length
      ? items[index]
      : { title: '', description: '' };
  });

  getNextItem() {
    const items = this.items();
    const nextIndex = (this.currentItemIndex() + 1) % items.length;
    return items.length > 0 && nextIndex >= 0 && nextIndex < items.length
      ? items[nextIndex]
      : { title: '', description: '' };
  }

  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.isVisible.set(entry.isIntersecting);

        if (entry.isIntersecting) {
          this.startSlideAnimation();
        } else {
          this.stopSlideAnimation();
        }
      },
      { threshold: 0.1 }
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  private startSlideAnimation(): void {
    if (this.slideAnimationSubscription) {
      return;
    }

    this.slideAnimationSubscription = interval(this.animationDuration()).subscribe(() => {
      this.performSlideTransition();
    });
  }

  private performSlideTransition(): void {
    // Calculate upcoming content width before starting animation
    if (this.titleMeasure().nativeElement) {
      const upcomingWidth = this.titleMeasure().nativeElement.offsetWidth;
      this.animationWidth.set(`${upcomingWidth}px`);
    }

    // Start the title block animation first
    this.blockAnimationState.set('covering');

    // Start description block animation with a slight delay
    setTimeout(() => {
      this.descriptionBlockAnimationState.set('covering');
    }, 150); // 150ms delay after title animation starts
  }

  onBlockAnimationDone(event: any): void {
    const currentState = this.blockAnimationState();
    const descriptionState = this.descriptionBlockAnimationState();

    if (currentState === 'covering') {
      // Title block has covered the text, now change the content
      this.currentItemIndex.update((index) => (index + 1) % this.items().length);
      // Start revealing the new text
      this.blockAnimationState.set('revealing');
    } else if (currentState === 'revealing') {
      // Title animation complete, reset to hidden state and restore auto width
      this.blockAnimationState.set('hidden');
      this.animationWidth.set('auto');
    }
  }

  onDescriptionBlockAnimationDone(event: any): void {
    const descriptionState = this.descriptionBlockAnimationState();

    if (descriptionState === 'covering') {
      // Description block has covered the text, start revealing
      this.descriptionBlockAnimationState.set('revealing');
    } else if (descriptionState === 'revealing') {
      // Description animation complete, reset to hidden state
      this.descriptionBlockAnimationState.set('hidden');
    }
  }

  getTitleContainerStyle() {
    return this.blockAnimationState() !== 'hidden'
      ? { width: this.animationWidth() }
      : { width: 'auto' };
  }

  private stopSlideAnimation(): void {
    this.slideAnimationSubscription?.unsubscribe();
    this.slideAnimationSubscription = undefined;
  }

  gotoSlide(index: number): void {
    if (index < 0 || index >= this.items().length) return;
    this.stopSlideAnimation();
    this.currentItemIndex.set(index);
    this.startSlideAnimation();
  }
}
