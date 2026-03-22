import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

export type LiveSessionVm = {
  id: string;
  title: string;
  teacherName: string;
  scheduledAt: string;
  status: 'live' | 'scheduled' | 'ended';
  coverUrl: string;
  duration: number;
  participantCount: number;
};

@Component({
  selector: 'app-live-sessions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss']
})
export class LiveSessionsComponent {
  toast = inject(ToastService);
  isLoading = signal(true);
  activeSession = signal<LiveSessionVm | null>(null);

  sessions = signal<LiveSessionVm[]>([
    {
      id: 's1',
      title: 'Correction du devoir de maths',
      teacherName: 'M. Amine',
      scheduledAt: '2026-03-21T14:00:00',
      status: 'live',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=60',
      duration: 60,
      participantCount: 38
    },
    {
      id: 's2',
      title: 'Physique — Cinématique et mouvements',
      teacherName: 'Mme Salma',
      scheduledAt: '2026-03-22T10:00:00',
      status: 'scheduled',
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=60',
      duration: 45,
      participantCount: 25
    },
    {
      id: 's3',
      title: 'Anglais — Conversation et expression orale',
      teacherName: 'Ms. Sarah',
      scheduledAt: '2026-03-23T15:00:00',
      status: 'scheduled',
      coverUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=60',
      duration: 30,
      participantCount: 18
    },
    {
      id: 's4',
      title: 'SVT — La photosynthèse',
      teacherName: 'Dr. Youssef',
      scheduledAt: '2026-03-24T09:00:00',
      status: 'scheduled',
      coverUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=60',
      duration: 50,
      participantCount: 32
    },
    {
      id: 's5',
      title: 'Français — Analyse de texte',
      teacherName: 'M. Karim',
      scheduledAt: '2026-03-20T14:00:00',
      status: 'ended',
      coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=60',
      duration: 60,
      participantCount: 45
    }
  ]);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  joinSession(id: string) {
    const session = this.sessions().find(s => s.id === id);
    if (session) {
      this.activeSession.set(session);
    }
  }

  leaveSession() {
    this.activeSession.set(null);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'ended': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'live': return 'En direct';
      case 'scheduled': return 'Planifié';
      case 'ended': return 'Terminé';
      default: return status;
    }
  }

  getLiveCount(): number {
    return this.sessions().filter(s => s.status === 'live').length;
  }

  getScheduledCount(): number {
    return this.sessions().filter(s => s.status === 'scheduled').length;
  }

  getEndedCount(): number {
    return this.sessions().filter(s => s.status === 'ended').length;
  }

  getTotalParticipants(): number {
    return this.sessions().reduce((acc, s) => acc + s.participantCount, 0);
  }

  toggleMic() {
    this.toast.info("Micro activé/désactivé");
  }

  toggleVideo() {
    this.toast.info("Caméra activée/désactivée");
  }

  shareScreen() {
    this.toast.info("Partage d'écran demandé...");
  }

  raiseHand() {
    this.toast.info("Vous avez levé la main ✋");
  }
}
