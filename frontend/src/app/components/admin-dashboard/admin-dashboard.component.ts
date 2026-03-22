import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

export type UserVm = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
};

export type StatsVm = {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalRevenue: number;
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  toast = inject(ToastService);
  isLoading = signal(true);
  activeTab = signal<'overview' | 'users' | 'courses'>('overview');

  stats = signal<StatsVm>({
    totalStudents: 12500,
    totalTeachers: 45,
    totalCourses: 248,
    totalRevenue: 125000
  });

  recentUsers = signal<UserVm[]>([
    { id: 'u1', name: 'Youssef Amrani', email: 'youssef@email.com', role: 'student', status: 'active', createdAt: '2026-03-20' },
    { id: 'u2', name: 'M. Amine', email: 'amine@email.com', role: 'teacher', status: 'active', createdAt: '2026-03-19' },
    { id: 'u3', name: 'Mme Fatima', email: 'fatima@email.com', role: 'parent', status: 'active', createdAt: '2026-03-18' },
    { id: 'u4', name: 'Sofia Amrani', email: 'sofia@email.com', role: 'student', status: 'inactive', createdAt: '2026-03-15' }
  ]);

  recentCourses = signal([
    { id: 'c1', title: 'Algèbre — Bases et exercices', teacher: 'M. Amine', students: 45, status: 'published' },
    { id: 'c2', title: 'Physique — Mécanique', teacher: 'Mme Salma', students: 32, status: 'published' },
    { id: 'c3', title: 'Trigonométrie', teacher: 'M. Amine', students: 0, status: 'draft' }
  ]);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 600);
  }

  setTab(tab: 'overview' | 'users' | 'courses') {
    this.activeTab.set(tab);
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      case 'parent': return 'bg-purple-100 text-purple-700';
      case 'admin': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'student': return 'Étudiant';
      case 'teacher': return 'Professeur';
      case 'parent': return 'Parent';
      case 'admin': return 'Admin';
      default: return role;
    }
  }

  exportReports() {
    this.toast.success("Rapports en cours d'exportation. Vous recevrez un email.");
  }
  
  openSettings() {
    this.toast.info("Ouverture des paramètres avancés...");
  }
  
  addUser() {
    this.toast.info("Ouverture du formulaire d'ajout d'utilisateur.");
  }

  editUser(user: UserVm) {
    this.toast.info(`Édition de l'utilisateur ${user.name}`);
  }

  deleteUser(user: UserVm) {
    this.toast.warning(`Utilisateur ${user.name} supprimé avec succès.`);
    
    // update list visually
    const currentList = this.recentUsers();
    this.recentUsers.set(currentList.filter(u => u.id !== user.id));
  }

  addCourse() {
    this.toast.info("Ouverture du formulaire de création de cours.");
  }

  viewCourseAction(title: string) {
    this.toast.info(`Affichage des détails du cours : ${title}`);
  }

  editCourseAction(title: string) {
    this.toast.info(`Édition du cours : ${title}`);
  }

  publishCourseAction(title: string) {
    this.toast.success(`Le cours "${title}" a été publié !`);
    
    // update list visually
    const currentList = this.recentCourses().map(c => {
      if (c.title === title) {
        return { ...c, status: 'published' };
      }
      return c;
    });
    this.recentCourses.set(currentList);
  }
}
