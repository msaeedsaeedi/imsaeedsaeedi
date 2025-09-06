import { Component, Input, OnInit, OnDestroy, input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Skill {
  name: string;
  subskills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  skills = input.required<Skill[]>();
  animationDuration = input<number>(4000);
  autoplay = input<boolean>(true);
  showIndicators = input<boolean>(true);

  private animationInterval: any;
  currentSkillIndex = 0;
  isPaused = false;

  ngAfterViewInit(): void {
    if (this.autoplay() && this.skills().length > 1) {
      this.startSlideAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startSlideAnimation(): void {
    this.animationInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSkill();
      }
    }, this.animationDuration());
  }

  private nextSkill(): void {
    this.currentSkillIndex = (this.currentSkillIndex + 1) % this.skills().length;
  }

  goToSkill(index: number): void {
    if (index === this.currentSkillIndex) return;
    this.currentSkillIndex = index;
  }

  pauseAnimation(): void {
    this.isPaused = true;
  }

  resumeAnimation(): void {
    this.isPaused = false;
  }

  get currentSkill(): Skill {
    return this.skills()[this.currentSkillIndex] || { name: '', subskills: [] };
  }
}
