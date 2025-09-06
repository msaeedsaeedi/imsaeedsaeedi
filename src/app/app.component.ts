import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SlidesComponent, Slide } from './components/slides/slides.component';
import { SkillsComponent, Skill } from './components/skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [ScrollbarComponent, LoadingComponent, SlidesComponent, SkillsComponent],
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

  readonly skillsData: Skill[] = [
    {
      name: 'Angular',
      subskills: ['TypeScript', 'RxJS', 'NgRx', 'PrimeNg', 'i18n', 'Unit Testing', 'Turborepo', 'Tailwind']
    },
    {
      name: 'Backend',
      subskills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'JWT', 'REST APIs', 'GraphQL']
    },
    {
      name: 'DevOps',
      subskills: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx', 'Linux', 'Monitoring']
    },
    {
      name: 'Tools',
      subskills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Jira', 'Postman', 'Chrome DevTools', 'Slack', 'Notion', 'Trello', 'Zoom']
    }
  ];

  onSlideChange(slideIndex: number): void {
    // Handle slide change if needed
    console.log('Current slide:', slideIndex);
  }
}
