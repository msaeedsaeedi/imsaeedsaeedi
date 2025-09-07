import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-scrollbar',
  imports: [],
  templateUrl: './scrollbar.html',
  styleUrl: './scrollbar.css',
})
export class Scrollbar implements AfterViewInit, OnDestroy {
  mainContainer = input<ElementRef<HTMLElement> | null>(null);

  renderer2 = inject(Renderer2);

  thumb = viewChild<ElementRef<HTMLDivElement>>('thumb');
  scrollbarContainer = viewChild<ElementRef<HTMLDivElement>>('container');

  scrollListener!: () => void;

  ngAfterViewInit(): void {
    this.updateScrollbar();
    this.scrollListener = this.renderer2.listen(
      this.mainContainer()?.nativeElement,
      'scroll',
      () => {
        this.updateScrollbar();
      }
    );
  }

  private updateScrollbar() {
    const thumbElement = this.thumb()?.nativeElement;
    const scrollbarContainerElement = this.scrollbarContainer()?.nativeElement;
    const mainContainerElement = this.mainContainer()?.nativeElement;

    if (!thumbElement || !scrollbarContainerElement || !mainContainerElement) return;

    // Get scroll information
    const scrollTop = mainContainerElement.scrollTop;
    const scrollHeight = mainContainerElement.scrollHeight;
    const clientHeight = mainContainerElement.clientHeight;

    // Calculate scroll percentage
    const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

    // Get scrollbar container dimensions
    const scrollbarHeight = scrollbarContainerElement.clientHeight;
    const thumbHeight = 32;
    const spacing = 32; // Add 16px spacing from top and bottom

    // Calculate thumb position with spacing
    const availableHeight = scrollbarHeight - spacing * 2 - thumbHeight;
    const thumbTop = spacing + scrollPercentage * availableHeight;

    // Position the thumb
    thumbElement.style.top = `${thumbTop}px`;

    // Update the gradient background based on thumb position
    this.updateGradient(thumbTop, thumbHeight, scrollbarHeight, scrollbarContainerElement);
  }

  private updateGradient(
    thumbTop: number,
    thumbHeight: number,
    containerHeight: number,
    scrollbarContainerElement: HTMLDivElement
  ) {
    const center = thumbTop + thumbHeight / 2;
    const percent = (center / containerHeight) * 100;
    const fadeAmount = 2;
    const fadeStart = Math.max(0, percent - fadeAmount);
    const fadeEnd = Math.min(100, percent + fadeAmount);
    scrollbarContainerElement.style.background = `linear-gradient(to bottom, transparent 0%, white ${fadeStart}%, white ${fadeEnd}%, transparent 100%)`;
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }
}
