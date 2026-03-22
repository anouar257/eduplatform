import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

export type CourseVm = {
  id: string;
  title: string;
  studentCount: number;
  rating: number;
  status: 'published' | 'draft';
  coverUrl: string;
};

export type SessionVm = {
  id: string;
  title: string;
  scheduledAt: string;
  status: 'scheduled' | 'live' | 'ended';
  participantCount: number;
};

export type ExamVm = {
  id: string;
  title: string;
  submissionCount: number;
  avgScore: number;
  scheduledAt: string | null;
};

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent {
  toast = inject(ToastService);
  isLoading = signal(true);

  teacherName = signal('M. Amine');

  stats = signal({
    totalStudents: 156,
    totalCourses: 8,
    totalSessions: 24,
    avgRating: 4.7
  });

  myCourses = signal<CourseVm[]>([
    {
      id: 'c1',
      title: 'Algèbre — Bases et exercices',
      studentCount: 45,
      rating: 4.8,
      status: 'published',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=60'
    },
    {
      id: 'c2',
      title: 'Géométrie plane',
      studentCount: 32,
      rating: 4.6,
      status: 'published',
      coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=60'
    },
    {
      id: 'c3',
      title: 'Trigonométrie',
      studentCount: 28,
      rating: 4.9,
      status: 'draft',
      coverUrl: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&w=400&q=60'
    }
  ]);

  upcomingSessions = signal<SessionVm[]>([
    {
      id: 's1',
      title: 'Correction du devoir de maths',
      scheduledAt: '2026-03-22T14:00:00',
      status: 'scheduled',
      participantCount: 38
    },
    {
      id: 's2',
      title: 'Session Q&R — Équations',
      scheduledAt: '2026-03-23T10:00:00',
      status: 'scheduled',
      participantCount: 25
    }
  ]);

  recentExams = signal<ExamVm[]>([
    {
      id: 'e1',
      title: 'Algèbre — Équations',
      submissionCount: 42,
      avgScore: 72,
      scheduledAt: '2026-03-20T09:00:00'
    },
    {
      id: 'e2',
      title: 'Géométrie — Triangle',
      submissionCount: 30,
      avgScore: 68,
      scheduledAt: null
    }
  ]);

  constructor(private router: Router) {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  createNewCourse() {
    this.router.navigate(['/courses']);
  }

  viewCourse(courseId: string) {
    this.router.navigate(['/courses', courseId]);
  }

  viewExams() {
    this.router.navigate(['/exams']);
  }

  viewStudents() {
    this.router.navigate(['/dashboard']);
  }

  editCourse(course: CourseVm) {
    this.toast.info(`Ouverture de l'éditeur pour : ${course.title}...`);
  }

  gradeExam(exam: ExamVm) {
    this.toast.success(`Chargement des copies pour l'examen : ${exam.title}...`);
  }
}
