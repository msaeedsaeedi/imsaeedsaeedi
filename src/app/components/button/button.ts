import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class Button {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  label = input<string>('Button');
  variant = input<'primary' | 'secondary'>('primary');

  buttonClass = computed(() => {
    return `btn btn-${this.variant()} ${this.disabled() ? 'btn-disabled' : ''}`;
  });
}
