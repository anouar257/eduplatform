import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-correction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-correction.component.html'
})
export class ExamCorrectionComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);

  examId: string | null = null;
  submissions = [
    { id: '1', studentName: 'Ali Youssef', score: 85, status: 'Graded', date: '2026-03-22' },
    { id: '2', studentName: 'Sara Ahmed', score: 0, status: 'Pending', date: '2026-03-23' },
    { id: '3', studentName: 'Yassir B.', score: 92, status: 'Graded', date: '2026-03-23' }
  ];

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id');
    // TODO: fetch submissions for this examId from backend
  }

  gradeSubmission(subId: string) {
    // TODO: navigate to a detail grading view or open a modal
    console.log('Grading submission', subId);
    alert('Feature in development: Grading submission ' + subId);
  }
}
