import { Component, signal } from '@angular/core';
import { SlideItem, Slider } from '../../components/slider/slider';

@Component({
  selector: 'app-skills',
  imports: [Slider],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly skills = signal<SlideItem[]>([
    {
      title: 'Angular',
      description: 'TypeScript, RxJS, NgRx, PrimeNg, i18n, Unit Testing, Turborepo, Tailwind',
    },
    {
      title: 'Backend',
      description: 'Node.js, Express, MongoDB, PostgreSQL, Redis, JWT, REST APIs, GraphQL',
    },
    {
      title: 'DevOps',
      description: 'Docker, AWS, CI/CD, GitHub Actions, Nginx, Linux, Monitoring',
    },
    {
      title: 'Tools',
      description:
        'Git, GitHub, VS Code, Figma, Jira, Postman, Chrome DevTools, Slack, Notion, Trello, Zoom',
    },
  ]);
}
