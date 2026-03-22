import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type QuestionVm = {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: string[];
  correctAnswer: string;
};

export type ExamVm = {
  id: string;
  title: string;
  description: string;
  duration: number;
  questionCount: number;
  totalMarks: number;
  passingMarks: number;
  subjectName: string;
  levelName: string;
};

export type ResultVm = {
  percentage: number;
  obtainedMarks: number;
  totalMarks: number;
  passed: boolean;
};

@Component({
  selector: 'app-exam-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent {
  isLoading = signal(true);
  isStarted = signal(false);
  isSubmitted = signal(false);
  timeRemaining = signal(0);
  answers = signal<{ [key: string]: string }>({});
  result = signal<ResultVm | null>(null);

  exam = signal<ExamVm | null>(null);
  questions = signal<QuestionVm[]>([]);

  private timerInterval: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    const examId = this.route.snapshot.paramMap.get('id') ?? 'e1';

    this.exam.set({
      id: examId,
      title: 'Algèbre — Équations et inéquations',
      description: 'Examen sur les équations du 1er et 2ème degré',
      duration: 60,
      questionCount: 20,
      totalMarks: 100,
      passingMarks: 50,
      subjectName: 'Mathématiques',
      levelName: '2ème année'
    });

    this.questions.set([
      {
        id: 'q1',
        question: 'Résolvez l\'équation : 2x + 5 = 13',
        type: 'multiple_choice',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctAnswer: 'x = 4'
      },
      {
        id: 'q2',
        question: 'L\'équation x² = 4 admet deux solutions.',
        type: 'true_false',
        options: ['Vrai', 'Faux'],
        correctAnswer: 'Vrai'
      },
      {
        id: 'q3',
        question: 'Résolvez l\'inéquation : 3x - 2 < 7',
        type: 'short_answer',
        options: [],
        correctAnswer: 'x < 3'
      },
      {
        id: 'q4',
        question: 'Factorisez : x² - 9',
        type: 'multiple_choice',
        options: ['(x-3)(x+3)', '(x-3)²', '(x+3)²', '(x-9)(x+1)'],
        correctAnswer: '(x-3)(x+3)'
      },
      {
        id: 'q5',
        question: 'Le discriminant d\'une équation du second degré est toujours positif.',
        type: 'true_false',
        options: ['Vrai', 'Faux'],
        correctAnswer: 'Faux'
      }
    ]);

    setTimeout(() => this.isLoading.set(false), 500);
  }

  startExam() {
    const exam = this.exam();
    if (exam) {
      this.isStarted.set(true);
      this.timeRemaining.set(exam.duration * 60);
      this.startTimer();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const current = this.timeRemaining();
      if (current > 0) {
        this.timeRemaining.set(current - 1);
      } else {
        this.submitExam();
      }
    }, 1000);
  }

  submitExam() {
    clearInterval(this.timerInterval);

    const answers = this.answers();
    const questions = this.questions();
    let obtainedMarks = 0;

    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        obtainedMarks += 20;
      }
    });

    const totalMarks = questions.length * 20;
    const percentage = Math.round((obtainedMarks / totalMarks) * 100);

    this.result.set({
      percentage,
      obtainedMarks,
      totalMarks,
      passed: percentage >= 50
    });

    this.isSubmitted.set(true);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  setAnswer(questionId: string, answer: string) {
    this.answers.update(a => ({ ...a, [questionId]: answer }));
  }
}
