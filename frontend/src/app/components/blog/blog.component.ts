import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

export type ArticleVm = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
};

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html'
})
export class BlogComponent {
  toast = inject(ToastService);
  isLoading = signal(true);
  selectedCategory = signal('all');

  subscribeNewsletter(emailInput: HTMLInputElement) {
    if (!emailInput.value) {
      this.toast.error("Veuillez entrer une adresse email.");
      return;
    }
    this.toast.success("Parfait ! Vous êtes maintenant abonné à la newsletter.");
    emailInput.value = '';
  }

  categories = signal([
    'all', 'Actualités', 'Conseils', 'Parentalité', 'Technologie', 'Examens'
  ]);

  articles = signal<ArticleVm[]>([
    {
      id: '1',
      title: 'Comment préparer efficacement son Baccalauréat',
      excerpt: 'Découvrez les meilleures stratégies pour réviser et réussir votre examen final avec succès.',
      content: '',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=60',
      category: 'Examens',
      author: 'M. Amine El Amrani',
      date: '2026-03-20',
      readTime: 8
    },
    {
      id: '2',
      title: 'L\'importance du soutien scolaire en ligne',
      excerpt: 'Pourquoi les cours en ligne deviennent-ils essentiels pour la réussite éducative ?',
      content: '',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=60',
      category: 'Actualités',
      author: 'Mme. Salma Benali',
      date: '2026-03-18',
      readTime: 5
    },
    {
      id: '3',
      title: '5 conseils pour aider votre enfant à réviser',
      excerpt: 'Les parents jouent un rôle crucial dans la réussite scolaire. Voici comment les accompagner.',
      content: '',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=60',
      category: 'Parentalité',
      author: 'Mme. Fatima Zahra',
      date: '2026-03-15',
      readTime: 6
    },
    {
      id: '4',
      title: 'Les nouvelles technologies dans l\'éducation',
      excerpt: 'Comment l\'IA et les outils numériques transforment la façon d\'apprendre.',
      content: '',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=60',
      category: 'Technologie',
      author: 'Dr. Youssef El Fassi',
      date: '2026-03-12',
      readTime: 7
    },
    {
      id: '5',
      title: 'Gestion du stress avant les examens',
      excerpt: 'Techniques et conseils pour garder son calme et performer lors des évaluations.',
      content: '',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=60',
      category: 'Conseils',
      author: 'M. Karim Idrissi',
      date: '2026-03-10',
      readTime: 4
    },
    {
      id: '6',
      title: 'Choisir sa filière post-bac : guide complet',
      excerpt: 'Toutes les informations pour bien orienter votre enfant après le lycée.',
      content: '',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60',
      category: 'Conseils',
      author: 'Mme. Hind El Amrani',
      date: '2026-03-08',
      readTime: 10
    }
  ]);

  filteredArticles() {
    if (this.selectedCategory() === 'all') {
      return this.articles();
    }
    return this.articles().filter(a => a.category === this.selectedCategory());
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Actualités': 'bg-blue-100 text-blue-700',
      'Conseils': 'bg-green-100 text-green-700',
      'Parentalité': 'bg-purple-100 text-purple-700',
      'Technologie': 'bg-orange-100 text-orange-700',
      'Examens': 'bg-red-100 text-red-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  }

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
