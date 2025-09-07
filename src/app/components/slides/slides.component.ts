import {
  AfterViewInit,
  Component,
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

  currentItem = signal<SlideItem>({ title: '', description: '' });
  currentItemIndex = signal(0);
  private readonly isVisible = signal(false);

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

  goToItem(index: number): void {
    if (index >= 0 && index < this.items().length) {
      this.currentItemIndex.set(index);
    }
  }

  ngOnDestroy(): void {
    this.stopSlideAnimation();
    this.intersectionObserver?.disconnect();
  }
}
