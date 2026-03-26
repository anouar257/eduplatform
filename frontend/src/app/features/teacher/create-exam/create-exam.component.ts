import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-exam.component.html'
})
export class CreateExamComponent {
  router = inject(Router);

  exam = {
    title: '',
    duration: 60,
    questions: [
      { type: 'multiple_choice', text: '', options: ['', ''], correctAnswer: 0 }
    ]
  };

  addQuestion() {
    this.exam.questions.push({ type: 'multiple_choice', text: '', options: ['', ''], correctAnswer: 0 });
  }

  addOption(qIndex: number) {
    this.exam.questions[qIndex].options.push('');
  }

  removeQuestion(i: number) {
    this.exam.questions.splice(i, 1);
  }

  onSubmit() {
    // TODO: connect to backend to save exam
    console.log('Exam created:', this.exam);
    this.router.navigate(['/teacher']);
  }
}
