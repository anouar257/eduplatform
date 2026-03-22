import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export type EnrollmentVm = {
  courseId: string;
  courseTitle: string;
  teacherName: string;
  progress: number;
  coverUrl: string;
};

export type SessionVm = {
  id: string;
  title: string;
  teacherName: string;
  scheduledAt: string;
  status: 'upcoming' | 'live' | 'ended';
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isLoading = signal(true);

  private enrollmentsData = signal<EnrollmentVm[]>([
    {
      courseId: 'c1',
      courseTitle: 'Algèbre — Bases et exercices',
      teacherName: 'M. Amine',
      progress: 35,
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=60'
    },
    {
      courseId: 'c2',
      courseTitle: 'Physique — Mécanique',
      teacherName: 'Mme Salma',
      progress: 12,
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=60'
    }
  ]);

  private sessionsData = signal<SessionVm[]>([
    {
      id: 's1',
      title: 'Correction du devoir de maths',
      teacherName: 'M. Amine',
      scheduledAt: '2026-03-22T14:00:00',
      status: 'upcoming'
    },
    {
      id: 's2',
      title: 'Physique — Cinématique',
      teacherName: 'Mme Salma',
      scheduledAt: '2026-03-22T16:00:00',
      status: 'upcoming'
    }
  ]);

  enrollments = computed(() => this.enrollmentsData());
  sessions = computed(() => this.sessionsData());

  userInitials = computed(() => 'AB');

  welcomeMessage = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  });

  stats = computed(() => ({
    coursesInProgress: this.enrollmentsData().length,
    exercises: 24,
    average: 78
  }));

  constructor(private router: Router) {
    setTimeout(() => this.isLoading.set(false), 600);
  }

  joinSession(sessionId: string) {
    this.router.navigate(['/live-sessions']);
  }

  continueCourse(courseId: string) {
    this.router.navigate(['/courses', courseId]);
  }

  exploreCourses() {
    this.router.navigate(['/courses']);
  }

  viewExams() {
    this.router.navigate(['/exams']);
  }
}
