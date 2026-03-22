import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TestimonialVm = {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'teacher';
  avatar: string;
  content: string;
  rating: number;
  date: string;
};

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  isLoading = signal(true);
  selectedRole = signal('all');

  testimonials = signal<TestimonialVm[]>([
    {
      id: '1',
      name: 'Youssef Amrani',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=60',
      content: 'Excellent plateforme ! Les cours sont très bien expliqués et les profs sont pédagogues. J\'ai amélioré mes notes en maths de 8 à 15 en quelques mois. Je recommande fortement !',
      rating: 5,
      date: '2026-03-15'
    },
    {
      id: '2',
      name: 'Mme. Fatima El Amrani',
      role: 'parent',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=60',
      content: 'Mes enfants adorent cette plateforme. Ils peuvent réviser à leur rythme et les sessions live sont très interactives. En tant que parent, je peux suivre leur progression facilement. Merci EduPlatform !',
      rating: 5,
      date: '2026-03-18'
    },
    {
      id: '3',
      name: 'Sofia Benali',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=60',
      content: 'La plateforme m\'a beaucoup aidée pour préparer mon Bac. Les résumés de cours sont clairs et les examens blancs m\'ont permis de m\'entraîner efficacement. J\'ai eu mon Bac avec mention !',
      rating: 5,
      date: '2026-03-10'
    },
    {
      id: '4',
      name: 'M. Amine Idrissi',
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=60',
      content: 'En tant que professeur, je trouve cette plateforme très bien conçue. Les outils pour créer des cours et suivre les étudiants sont excellents. L\'équipe technique est très réactive.',
      rating: 5,
      date: '2026-03-12'
    },
    {
      id: '5',
      name: 'Ali El Fassi',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=60',
      content: 'Les sessions live sont super interactives ! On peut poser des questions en direct et le prof répond immédiatement. C\'est comme être en classe mais depuis chez soi. Top !',
      rating: 4,
      date: '2026-03-20'
    },
    {
      id: '6',
      name: 'M. Rachid El Mansouri',
      role: 'parent',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=60',
      content: 'Je suis impresionné par la qualité des cours. Mon fils qui était en difficulté en physique a repris confiance en lui grâce aux explications claires des profs. Merci pour votre travail !',
      rating: 5,
      date: '2026-03-08'
    }
  ]);

  filteredTestimonials() {
    if (this.selectedRole() === 'all') {
      return this.testimonials();
    }
    return this.testimonials().filter(t => t.role === this.selectedRole());
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'student': return 'Étudiant';
      case 'parent': return 'Parent';
      case 'teacher': return 'Professeur';
      default: return role;
    }
  }

  getRoleEmoji(role: string): string {
    switch (role) {
      case 'student': return '👨‍🎓';
      case 'parent': return '👨‍👩‍👧';
      case 'teacher': return '👨‍🏫';
      default: return '👤';
    }
  }

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  filterByRole(role: string) {
    this.selectedRole.set(role);
  }
}
