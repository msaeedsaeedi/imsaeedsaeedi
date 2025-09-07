import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  protected isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((prev) => !prev);
  }
}
