import { Component, signal } from '@angular/core';
import { SlideItem, Slider } from '../../components/slider/slider';

@Component({
  selector: 'app-projects',
  imports: [Slider],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly projects = signal<SlideItem[]>([
    {
      title: 'Uniflowco',
      description:
        'An enterprise-level real-time timetable system for universities to streamline tasks. It helps students and faculty stay updated and organized with regular, timely updates, and assists faculty in managing their classes.',
      action: {
        text: 'View Project',
        url: 'https://msaeedsaeedi.com',
      },
    },
    {
      title: 'Taskana',
      description:
        'A task management SaaS application designed to help teams and individuals organize, prioritize, and track their tasks efficiently. It offers features like task assignment, deadlines, progress tracking, and collaboration tools to enhance productivity.',
      action: {
        text: 'View Project',
        url: 'https://msaeedsaeedi.com',
      },
    },
  ]);
}
