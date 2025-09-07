import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IntroductionComponent } from './sections/introduction/introduction.component';
import { RolesComponent } from './sections/roles/roles.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  imports: [
    ScrollbarComponent,
    LoadingComponent,
    IntroductionComponent,
    RolesComponent,
    ProjectsComponent,
    SkillsComponent,
    MenuComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('container', { static: true }) ref!: ElementRef<HTMLElement>;
}
