import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  imports: [],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent {
  readonly title = 'I am Mohammad Saeed';
  readonly subtitle = 'Coder, Poet, and Dreamer';
}
