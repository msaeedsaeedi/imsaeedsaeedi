import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit {
  isLoading = signal(true);

  ngOnInit(): void {
    // Simulate loading time - adjust as needed
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2500);
  }
}
