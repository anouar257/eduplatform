import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  isLoading = signal(true);

  stats = signal([
    { value: '12,500+', label: 'Étudiants', icon: '👨‍🎓' },
    { value: '45+', label: 'Professeurs', icon: '👨‍🏫' },
    { value: '248+', label: 'Cours', icon: '📚' },
    { value: '98%', label: 'Réussite', icon: '🎯' }
  ]);

  values = signal([
    { title: 'Excellence', description: 'Nous visons l\'excellence dans chaque cours et interaction', icon: '⭐' },
    { title: 'Innovation', description: 'Technologies modernes pour un apprentissage efficace', icon: '💡' },
    { title: 'Accessibilité', description: 'Education de qualité accessible à tous', icon: '🌍' },
    { title: 'Engagement', description: 'Suivi personnalisé pour chaque étudiant', icon: '🤝' }
  ]);

  team = signal([
    { name: 'Dr. Ahmed El Amrani', role: 'Directeur Général', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=60' },
    { name: 'Mme. Fatima Zahra', role: 'Directrice Pédagogique', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=60' },
    { name: 'M. Karim Idrissi', role: 'Responsable Technologie', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=60' }
  ]);

  features = signal([
    { title: 'Licence officielle', description: 'Éducation reconnue par le Ministère', icon: '📜' },
    { title: 'Certificats', description: 'Attestations de fin de formation', icon: '🏆' },
    { title: 'Support 24/7', description: ' Assistance pédagogique permanente', icon: '🕐' },
    { title: 'Multi-devices', description: 'Accessible sur tous vos appareils', icon: '📱' }
  ]);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }
}
