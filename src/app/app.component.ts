import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import {
  SlideShowcaseComponent,
  SlideItem,
} from './components/slide-showcase/slide-showcase.component';

@Component({
  selector: 'app-root',
  imports: [ScrollbarComponent, LoadingComponent, SlideShowcaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('container', { static: true }) ref!: ElementRef<HTMLElement>;

  readonly introSlides: SlideItem[] = [
    {
      title: 'I am Mohammad Saeed',
      subtitle: 'Coder, Poet, and Dreamer',
    },
  ];

  readonly roleSlides: SlideItem[] = [
    {
      title: 'Project Manager',
      description: 'Building SaaS MVPs that Scale',
    },
    {
      title: 'Software Engineer',
      description: 'Crafting Digital Solutions',
    },
    {
      title: 'Product Owner',
      description: 'Turning Ideas into Reality',
    },
  ];

  readonly projectsData: SlideItem[] = [
    {
      title: 'Uniflowco',
      description:
        'An enterprise-level real-time timetable system for universities to streamline tasks. It helps students and faculty stay updated and organized with regular, timely updates, and assists faculty in managing their classes.',
    },
    {
      title: 'Taskana',
      description:
        'A task management SaaS application designed to help teams and individuals organize, prioritize, and track their tasks efficiently. It offers features like task assignment, deadlines, progress tracking, and collaboration tools to enhance productivity.',
    },
  ];

  readonly skillsData: SlideItem[] = [
    {
      title: 'Angular',
      description:
        'TypeScript, RxJS, NgRx, PrimeNg, i18n, Unit Testing, Turborepo, Tailwind',
    },
    {
      title: 'Backend',
      description:
        'Node.js, Express, MongoDB, PostgreSQL, Redis, JWT, REST APIs, GraphQL',
    },
    {
      title: 'DevOps',
      description:
        'Docker, AWS, CI/CD, GitHub Actions, Nginx, Linux, Monitoring',
    },
    {
      title: 'Tools',
      description:
        'Git, GitHub, VS Code, Figma, Jira, Postman, Chrome DevTools, Slack, Notion, Trello, Zoom',
    },
  ];

  onSlideChange(slideIndex: number): void {
    // Handle slide change if needed
    console.log('Current slide:', slideIndex);
  }
}
