import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

export interface SlideItem {
  title: string;
  description?: string;
}

@Component({
  selector: 'app-slides',
  imports: [],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.css',
})
export class SlidesComponent implements AfterViewInit, OnDestroy {
  items = input.required<SlideItem[]>();
  leadingText = input<string>('');
  animationDuration = input<number>(4000);

  private readonly elementRef = inject(ElementRef);

  private slideAnimationSubscription?: Subscription;
  private intersectionObserver?: IntersectionObserver;

  private readonly isVisible = signal(false);
  currentItemIndex = signal(0);
  currentItem = computed(() => {
    const items = this.items();
    const index = this.currentItemIndex();
    return items.length > 0 && index >= 0 && index < items.length
      ? items[index]
      : { title: '', description: '' };
  });

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
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

    this.slideAnimationSubscription = interval(
      this.animationDuration()
    ).subscribe(() => {
      this.currentItemIndex.update(
        (index) => (index + 1) % this.items().length
      );
    });
  }

  private stopSlideAnimation(): void {
    this.slideAnimationSubscription?.unsubscribe();
    this.slideAnimationSubscription = undefined;
  }

  ngOnDestroy(): void {
    this.stopSlideAnimation();
    this.intersectionObserver?.disconnect();
  }
}
