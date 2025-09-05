import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';

@Component({
  selector: 'app-root',
  imports: [ScrollbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('container', { static: true }) ref!: ElementRef<HTMLElement>;
}
