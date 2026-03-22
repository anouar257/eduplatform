import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

export type ChildVm = {
  id: string;
  name: string;
  level: string;
  avatarUrl: string;
};

export type ProgressVm = {
  courseId: string;
  courseTitle: string;
  progress: number;
  lastAccess: string;
};

export type SessionVm = {
  id: string;
  title: string;
  childName: string;
  scheduledAt: string;
};

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent {
  toast = inject(ToastService);
  isLoading = signal(true);

  parentName = signal('Mme Fatima');

  children = signal<ChildVm[]>([
    { id: 'ch1', name: 'Youssef', level: '2ème année', avatarUrl: '' },
    { id: 'ch2', name: 'Sofia', level: '4ème année', avatarUrl: '' }
  ]);

  selectedChildId = signal('ch1');

  progress = signal<ProgressVm[]>([
    { courseId: 'c1', courseTitle: 'Algèbre — Bases et exercices', progress: 35, lastAccess: '2026-03-20' },
    { courseId: 'c2', courseTitle: 'Physique — Mécanique', progress: 12, lastAccess: '2026-03-19' },
    { courseId: 'c3', courseTitle: 'Français — Expression écrite', progress: 58, lastAccess: '2026-03-20' }
  ]);

  upcomingSessions = signal<SessionVm[]>([
    { id: 's1', title: 'Correction du devoir de maths', childName: 'Youssef', scheduledAt: '2026-03-22T14:00:00' },
    { id: 's2', title: 'Physique — Cinématique', childName: 'Sofia', scheduledAt: '2026-03-23T10:00:00' }
  ]);

  stats = signal({
    avgProgress: 35,
    totalCourses: 6,
    avgScore: 72,
    sessionsThisWeek: 4
  });

  constructor() {
    setTimeout(() => this.isLoading.set(false), 600);
  }

  selectChild(childId: string) {
    this.selectedChildId.set(childId);
  }

  getCompletedCourses(): number {
    return this.progress().filter(p => p.progress === 100).length;
  }

  getAverageProgress(): number {
    const progress = this.progress();
    if (progress.length === 0) return 0;
    const total = progress.reduce((acc, p) => acc + p.progress, 0);
    return Math.round(total / progress.length);
  }

  getChildInitial(name: string): string {
    return name.charAt(0);
  }

  contactTeacher() {
    this.toast.info("Ouverture de la messagerie avec les professeurs...");
  }
  
  viewSessionDetails(session: SessionVm) {
    this.toast.success(`Chargement des détails de la session : ${session.title}...`);
  }
}
