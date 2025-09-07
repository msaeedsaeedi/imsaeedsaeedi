import { Component } from '@angular/core';
import {
  SlideItem,
  SlidesComponent,
} from '../../components/slides/slides.component';

@Component({
  selector: 'app-roles',
  imports: [SlidesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  readonly roles: SlideItem[] = [
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
}
