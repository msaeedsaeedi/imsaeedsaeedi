import { Component, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-scrollbar',
  imports: [],
  templateUrl: './scrollbar.html',
  styleUrl: './scrollbar.css',
})
export class Scrollbar {
  mainContainer = input<ElementRef<HTMLElement> | null>(null);
}
