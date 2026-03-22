import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type CourseCardVm = {
  id: string;
  title: string;
  teacherName: string;
  durationMin: number;
  levelName: string;
  categoryName: string;
  coverUrl: string;
};

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-card.component.html'
})
export class CourseCardComponent {
  course = input.required<CourseCardVm>();

  durationLabel = computed(() => {
    const mins = this.course().durationMin;
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m === 0 ? `${h} h` : `${h} h ${m} min`;
  });
}
