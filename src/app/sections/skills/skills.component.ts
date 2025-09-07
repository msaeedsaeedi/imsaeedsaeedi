import { Component } from '@angular/core';
import {
  SlideItem,
  SlidesComponent,
} from '../../components/slides/slides.component';

@Component({
  selector: 'app-skills',
  imports: [SlidesComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  readonly skills: SlideItem[] = [
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
}
