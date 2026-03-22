import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

export type ResourceVm = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  type: 'pdf' | 'doc' | 'video' | 'ebook';
  size: string;
  downloadUrl: string;
  thumbnail: string;
  downloads: number;
  date: string;
};

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './library.component.html'
})
export class LibraryComponent {
  toast = inject(ToastService);
  isLoading = signal(true);
  searchQuery = signal('');
  selectedCategory = signal('all');
  selectedLevel = signal('all');
  selectedType = signal('all');
  viewMode = signal<'grid' | 'list'>('grid');

  categories = signal([
    'all', 'Mathématiques', 'Physique-Chimie', 'SVT', 'Français', 
    'Arabe', 'Anglais', 'Histoire-Géographie', 'Philosophie', 'Informatique'
  ]);

  levels = signal([
    'all', 'Primaire', 'Collège', 'Lycée', 'Bac', 'Supérieur'
  ]);

  types = signal([
    { id: 'all', name: 'Tous', icon: '📁' },
    { id: 'pdf', name: 'PDF', icon: '📄' },
    { id: 'doc', name: 'Documents', icon: '📝' },
    { id: 'video', name: 'Vidéos', icon: '🎬' },
    { id: 'ebook', name: 'eBooks', icon: '📚' }
  ]);

  resources = signal<ResourceVm[]>([
    {
      id: 'r1',
      title: 'Cours complet Algèbre - Tronc Commun',
      description: 'Document PDF complet couvrant tout le programme d\'algèbre du tronc commun scientifique.',
      category: 'Mathématiques',
      level: 'Collège',
      type: 'pdf',
      size: '2.4 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=60',
      downloads: 1543,
      date: '2026-03-15'
    },
    {
      id: 'r2',
      title: 'Guide de révision Bac Français',
      description: 'Guide complet pour préparer l\'épreuve de français du baccalauréat.',
      category: 'Français',
      level: 'Bac',
      type: 'pdf',
      size: '1.8 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=60',
      downloads: 2891,
      date: '2026-03-10'
    },
    {
      id: 'r3',
      title: 'Cours Physique - Électricité',
      description: 'Cours complet sur l\'électricité avec schémas et exercices corrigés.',
      category: 'Physique-Chimie',
      level: 'Lycée',
      type: 'pdf',
      size: '3.2 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=60',
      downloads: 987,
      date: '2026-03-08'
    },
    {
      id: 'r4',
      title: 'Histoire du Maroc - Résumé complet',
      description: 'Résumé de l\'histoire du Maroc de l\'antiquité à nos jours.',
      category: 'Histoire-Géographie',
      level: 'Collège',
      type: 'ebook',
      size: '5.1 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=60',
      downloads: 2156,
      date: '2026-03-05'
    },
    {
      id: 'r5',
      title: 'Chimie organique - Méthodes et exercices',
      description: 'Méthodes de résolution et exercices corrigés de chimie organique.',
      category: 'Physique-Chimie',
      level: 'Bac',
      type: 'pdf',
      size: '4.5 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=60',
      downloads: 1234,
      date: '2026-03-01'
    },
    {
      id: 'r6',
      title: 'Anglais - Grammaire complète',
      description: 'Guide de grammaire anglaise avec exercices et corrections.',
      category: 'Anglais',
      level: 'Lycée',
      type: 'pdf',
      size: '2.1 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=60',
      downloads: 1876,
      date: '2026-02-28'
    },
    {
      id: 'r7',
      title: 'SVT - Biologie cellulaire',
      description: 'Cours complet sur la biologie cellulaire avec illustrations.',
      category: 'SVT',
      level: 'Collège',
      type: 'pdf',
      size: '6.3 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=60',
      downloads: 765,
      date: '2026-02-25'
    },
    {
      id: 'r8',
      title: 'Philosophie - Les grands philosophes',
      description: 'Présentation des principaux philosophes et leurs œuvres.',
      category: 'Philosophie',
      level: 'Bac',
      type: 'ebook',
      size: '3.8 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60',
      downloads: 1432,
      date: '2026-02-20'
    },
    {
      id: 'r9',
      title: 'Mathématiques - Formulaire complet',
      description: 'Formulaire de mathématiques de la primaire au lycée.',
      category: 'Mathématiques',
      level: 'Primaire',
      type: 'pdf',
      size: '1.2 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fbad8b?auto=format&fit=crop&w=400&q=60',
      downloads: 3456,
      date: '2026-02-18'
    },
    {
      id: 'r10',
      title: 'Arabe - Grammaire et conjugaison',
      description: 'Cours complet de grammaire arabe avec exercices.',
      category: 'Arabe',
      level: 'Primaire',
      type: 'pdf',
      size: '2.7 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=60',
      downloads: 2134,
      date: '2026-02-15'
    },
    {
      id: 'r11',
      title: 'Géographie - Cartes du monde',
      description: 'Atlas géographique avec cartes détaillées du monde.',
      category: 'Histoire-Géographie',
      level: 'Collège',
      type: 'pdf',
      size: '8.9 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=60',
      downloads: 876,
      date: '2026-02-10'
    },
    {
      id: 'r12',
      title: 'Programmation Python - Initiation',
      description: 'Cours d\'initiation à la programmation Python pour débutants.',
      category: 'Informatique',
      level: 'Lycée',
      type: 'pdf',
      size: '4.2 MB',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=60',
      downloads: 1567,
      date: '2026-02-05'
    }
  ]);

  filteredResources() {
    let result = this.resources();

    if (this.selectedCategory() !== 'all') {
      result = result.filter(r => r.category === this.selectedCategory());
    }

    if (this.selectedLevel() !== 'all') {
      result = result.filter(r => r.level === this.selectedLevel());
    }

    if (this.selectedType() !== 'all') {
      result = result.filter(r => r.type === this.selectedType());
    }

    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query)
      );
    }

    return result;
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'pdf': '📄',
      'doc': '📝',
      'video': '🎬',
      'ebook': '📚'
    };
    return icons[type] || '📁';
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'pdf': 'bg-red-100 text-red-700',
      'doc': 'bg-blue-100 text-blue-700',
      'video': 'bg-purple-100 text-purple-700',
      'ebook': 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  }

  constructor() {
    setTimeout(() => this.isLoading.set(false), 800);
  }

  downloadResource(resource: ResourceVm) {
    this.toast.success(`Téléchargement de "${resource.title}" démarré...`);
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.selectedLevel.set('all');
    this.selectedType.set('all');
  }

  proposeResource() {
    this.toast.info("Le portail de contribution sera bientôt disponible !");
  }
}
