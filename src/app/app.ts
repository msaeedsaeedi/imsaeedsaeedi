import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Loading } from './components/loading/loading';
import { Menu } from './components/menu/menu';
import { Introduction } from './sections/introduction/introduction';
import { Roles } from './sections/roles/roles';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';
import { Scrollbar } from './components/scrollbar/scrollbar';

@Component({
  selector: 'app-root',
  imports: [Loading, Menu, Introduction, Roles, Projects, Skills, Scrollbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  ref = viewChild.required<ElementRef<HTMLElement>>('container');
}
