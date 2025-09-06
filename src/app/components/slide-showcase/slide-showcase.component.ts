import { Component, Input, OnInit, OnDestroy, input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StyleOverrides {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textTransform?: string;
  lineHeight?: string;
  letterSpacing?: string;
  margin?: string;
  padding?: string;
  maxWidth?: string;
}

export interface SlideItem {
  title: string;
  subtitle?: string;
  description?: string;
}

export type SlideType = 'center' | 'normal';

@Component({
  selector: 'app-slide-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-showcase.component.html',
  styleUrl: './slide-showcase.component.css',
})
export class SlideShowcaseComponent implements AfterViewInit, OnDestroy {
  items = input.required<SlideItem[]>();
  leadingText = input<string>('');
  slideType = input<SlideType>('normal'); // 'center' or 'normal'
  animationDuration = input<number>(4000);
  autoplay = input<boolean>(true);
  showIndicators = input<boolean>(true);
  
  // Style override inputs
  titleStyles = input<StyleOverrides>({});
  descriptionStyles = input<StyleOverrides>({});
  leadingTextStyles = input<StyleOverrides>({});
  
  @Output() slideChange = new EventEmitter<number>();

  private animationInterval: any;
  currentItemIndex = 0;
  isPaused = false;

  ngAfterViewInit(): void {
    if (this.autoplay() && this.items().length > 1) {
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
        this.nextItem();
      }
    }, this.animationDuration());
  }

  private nextItem(): void {
    this.currentItemIndex = (this.currentItemIndex + 1) % this.items().length;
    this.slideChange.emit(this.currentItemIndex);
  }

  goToItem(index: number): void {
    if (index === this.currentItemIndex) return;
    this.currentItemIndex = index;
    this.slideChange.emit(this.currentItemIndex);
  }

  pauseAnimation(): void {
    this.isPaused = true;
  }

  resumeAnimation(): void {
    this.isPaused = false;
  }

  get currentItem(): SlideItem {
    return this.items()[this.currentItemIndex] || { title: '', subtitle: '', description: '' };
  }

  get isCenter(): boolean {
    return this.slideType() === 'center';
  }

  get isNormal(): boolean {
    return this.slideType() === 'normal';
  }

  // Convert style overrides to CSS custom properties
  get titleStyleVars(): { [key: string]: string } {
    const styles = this.titleStyles();
    const cssVars: { [key: string]: string } = {};
    
    if (styles.fontSize) cssVars['--title-font-size'] = styles.fontSize;
    if (styles.fontWeight) cssVars['--title-font-weight'] = styles.fontWeight;
    if (styles.color) cssVars['--title-color'] = styles.color;
    if (styles.textTransform) cssVars['--title-text-transform'] = styles.textTransform;
    if (styles.lineHeight) cssVars['--title-line-height'] = styles.lineHeight;
    if (styles.letterSpacing) cssVars['--title-letter-spacing'] = styles.letterSpacing;
    if (styles.margin) cssVars['--title-margin'] = styles.margin;
    if (styles.padding) cssVars['--title-padding'] = styles.padding;
    
    return cssVars;
  }

  get descriptionStyleVars(): { [key: string]: string } {
    const styles = this.descriptionStyles();
    const cssVars: { [key: string]: string } = {};
    
    if (styles.fontSize) cssVars['--description-font-size'] = styles.fontSize;
    if (styles.fontWeight) cssVars['--description-font-weight'] = styles.fontWeight;
    if (styles.color) cssVars['--description-color'] = styles.color;
    if (styles.textTransform) cssVars['--description-text-transform'] = styles.textTransform;
    if (styles.lineHeight) cssVars['--description-line-height'] = styles.lineHeight;
    if (styles.letterSpacing) cssVars['--description-letter-spacing'] = styles.letterSpacing;
    if (styles.margin) cssVars['--description-margin'] = styles.margin;
    if (styles.padding) cssVars['--description-padding'] = styles.padding;
    if (styles.maxWidth) cssVars['--content-max-width'] = styles.maxWidth;
    
    return cssVars;
  }

  get leadingTextStyleVars(): { [key: string]: string } {
    const styles = this.leadingTextStyles();
    const cssVars: { [key: string]: string } = {};
    
    if (styles.fontSize) cssVars['--leading-font-size'] = styles.fontSize;
    if (styles.fontWeight) cssVars['--leading-font-weight'] = styles.fontWeight;
    if (styles.color) cssVars['--leading-color'] = styles.color;
    if (styles.textTransform) cssVars['--leading-text-transform'] = styles.textTransform;
    if (styles.lineHeight) cssVars['--leading-line-height'] = styles.lineHeight;
    if (styles.letterSpacing) cssVars['--leading-letter-spacing'] = styles.letterSpacing;
    if (styles.margin) cssVars['--leading-margin'] = styles.margin;
    if (styles.padding) cssVars['--leading-padding'] = styles.padding;
    
    return cssVars;
  }

  get combinedStyleVars(): { [key: string]: string } {
    return {
      ...this.titleStyleVars,
      ...this.descriptionStyleVars,
      ...this.leadingTextStyleVars
    };
  }
}
