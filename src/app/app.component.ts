import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SlidesComponent, Slide } from './components/slides/slides.component';

@Component({
  selector: 'app-root',
  imports: [ScrollbarComponent, LoadingComponent, SlidesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('container', { static: true }) ref!: ElementRef<HTMLElement>;

  readonly introSlides: Slide[] = [
    {
      title: 'I am Mohammad Saeed',
      subtitle: 'Coder, Poet, and Dreamer',
    },
    {
      title: 'Project Manager',
      subtitle: 'Building SaaS MVPs that Scale',
    },
    {
      title: 'Software Engineer',
      subtitle: 'Crafting Digital Solutions',
    },
    {
      title: 'Product Owner',
      subtitle: 'Turning Ideas into Reality',
    },
  ];

  onSlideChange(slideIndex: number): void {
    // Handle slide change if needed
    console.log('Current slide:', slideIndex);
  }
}
