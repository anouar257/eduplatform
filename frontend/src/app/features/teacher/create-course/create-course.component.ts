import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent {
  router = inject(Router);

  course = {
    title: '',
    description: '',
    subjectId: '',
    levelId: '',
    price: 0,
    imageUrl: '',
    isFree: false
  };

  onSubmit() {
    // TODO: connect to backend to save course
    console.log('Course to create:', this.course);
    this.router.navigate(['/teacher']); // redirect after creation
  }
}
