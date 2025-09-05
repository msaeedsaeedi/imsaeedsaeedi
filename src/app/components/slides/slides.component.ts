import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Slide {
  title: string;
  subtitle?: string;
  isLeadingOnly?: boolean;
}

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.css',
})
export class SlidesComponent implements OnInit, OnDestroy {
  @Input() slides: Slide[] = [];
  @Input() animationDuration: number = 5000; // 5 seconds per slide
  @Input() autoplay: boolean = true;
  @Input() showIndicators: boolean = true;
  @Output() slideChange = new EventEmitter<number>();

  private animationInterval: any;
  currentSlideIndex = 0;
  isPaused = false;

  ngOnInit(): void {
    if (this.autoplay && this.slides.length > 1) {
      this.startSlideAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startSlideAnimation(): void {
    this.animationInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.animationDuration);
  }

  private nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.slideChange.emit(this.currentSlideIndex);
  }

  goToSlide(index: number): void {
    if (index === this.currentSlideIndex) return;
    this.currentSlideIndex = index;
    this.slideChange.emit(this.currentSlideIndex);
  }

  pauseAnimation(): void {
    this.isPaused = true;
  }

  resumeAnimation(): void {
    this.isPaused = false;
  }

  get currentSlide(): Slide {
    return this.slides[this.currentSlideIndex] || {};
  }
}
