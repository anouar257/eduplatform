import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

export type TeacherVm = {
  id: string;
  name: string;
  photo: string;
  subjects: string[];
  bio: string;
  experience: number;
  studentsCount: number;
  rating: number;
};

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teachers.component.html'
})
export class TeachersComponent {
  toast = inject(ToastService);
  isLoading = signal(true);
  selectedSubject = signal('all');

  subjects = signal([
    'all', 'Mathématiques', 'Physique', 'Chimie', 'Français', 
    'Arabe', 'Anglais', 'SVT', 'Histoire-Géo', 'Philosophie'
  ]);

  teachers = signal<TeacherVm[]>([
    {
      id: 't1',
      name: 'M. Amine El Amrani',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=60',
      subjects: ['Mathématiques'],
      bio: 'Professeur agrégé de mathématiques avec 15 ans d\'expérience. Ancien élève de l\'École Normale Supérieure.',
      experience: 15,
      studentsCount: 1250,
      rating: 4.9
    },
    {
      id: 't2',
      name: 'Mme. Salma Benali',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=60',
      subjects: ['Physique', 'Chimie'],
      bio: 'Docteure en physique-chimie, spécialisée en pédagogie innovante et expérimentations en laboratoire.',
      experience: 12,
      studentsCount: 890,
      rating: 4.8
    },
    {
      id: 't3',
      name: 'M. Karim Idrissi',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=60',
      subjects: ['Français', 'Philosophie'],
      bio: 'Professeur certifié, auteur de plusieurs manuels scolaires. Passionné par la littérature et la pensée critique.',
      experience: 18,
      studentsCount: 1100,
      rating: 4.95
    },
    {
      id: 't4',
      name: 'Mme. Fatima Zahra',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=60',
      subjects: ['Arabe', 'Histoire-Géo'],
      bio: 'Spécialiste en langue arabe et civilisation. Diplômée de l\'Université Mohammed V.',
      experience: 10,
      studentsCount: 750,
      rating: 4.7
    },
    {
      id: 't5',
      name: 'Ms. Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60',
      subjects: ['Anglais'],
      bio: 'Native speaker américaine, certifiée TESOL. 8 ans d\'expérience dans l\'éducation au Maroc.',
      experience: 8,
      studentsCount: 680,
      rating: 4.85
    },
    {
      id: 't6',
      name: 'Dr. Youssef El Fassi',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60',
      subjects: ['SVT', 'Chimie'],
      bio: 'Docteur en biology, ancien chercheur à l\'Institut Pasteur. Pédagogue passionné.',
      experience: 14,
      studentsCount: 920,
      rating: 4.9
    },
    {
      id: 't7',
      name: 'M. Rachid El Mansouri',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=60',
      subjects: ['Mathématiques', 'Physique'],
      bio: 'Ingénieur agrégé, spécialisé en préparation aux concours et examens nationaux.',
      experience: 11,
      studentsCount: 1050,
      rating: 4.75
    },
    {
      id: 't8',
      name: 'Mme. Hind El Amrani',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=60',
      subjects: ['Français'],
      bio: 'Professeur de français langue étrangère, autrice de contenus pédagogiques.',
      experience: 9,
      studentsCount: 540,
      rating: 4.8
    }
  ]);

  filteredTeachers() {
    if (this.selectedSubject() === 'all') {
      return this.teachers();
    }
    return this.teachers().filter(t => t.subjects.includes(this.selectedSubject()));
  }

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  filterBySubject(subject: string) {
    this.selectedSubject.set(subject);
  }

  viewProfile(teacher: TeacherVm) {
    this.toast.info(`Ouverture du profil complet de ${teacher.name}...`);
  }

  applyNow() {
    this.toast.success("Redirection vers le portail de recrutement...");
  }
}
