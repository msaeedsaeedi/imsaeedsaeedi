import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-introduction',
  imports: [],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css',
})
export class Introduction {
  protected readonly title = signal('I am Mohammad Saeed');
  protected readonly subtitle = signal('Coder, Poet, and Dreamer');
}
