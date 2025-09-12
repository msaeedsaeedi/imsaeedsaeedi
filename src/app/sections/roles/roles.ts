import { Component, signal } from '@angular/core';
import { SlideItem, Slider } from '../../components/slider/slider';

@Component({
  selector: 'app-roles',
  imports: [Slider],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
  readonly roles = signal<SlideItem[]>([
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
  ]);
}
