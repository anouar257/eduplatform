import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type EventVm = {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'vacation' | 'session' | 'holiday';
  description: string;
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  isLoading = signal(true);
  currentMonth = signal(new Date().getMonth());
  currentYear = signal(new Date().getFullYear());
  selectedEvent = signal<EventVm | null>(null);

  monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  events = signal<EventVm[]>([
    { id: '1', title: 'Rentrée scolaire', date: '2026-09-01', type: 'holiday', description: 'Début de l\'année scolaire 2026-2027' },
    { id: '2', title: 'Examens du 1er trimestre', date: '2026-10-20', type: 'exam', description: 'Examens de fin du premier trimestre' },
    { id: '3', title: 'Vacances d\'automne', date: '2026-10-25', type: 'vacation', description: 'Vacances de la Toussaint' },
    { id: '4', title: 'Session live: Maths', date: '2026-03-22', type: 'session', description: 'Cours de mathématiques en direct' },
    { id: '5', title: 'Session live: Physique', date: '2026-03-23', type: 'session', description: 'Cours de physique en direct' },
    { id: '6', title: 'Examens du 2ème trimestre', date: '2027-01-15', type: 'exam', description: 'Examens de fin du deuxième trimestre' },
    { id: '7', title: 'Vacances de Noël', date: '2026-12-20', type: 'vacation', description: 'Vacances de fin d\'année' },
    { id: '8', title: 'Examens du Bac', date: '2027-06-10', type: 'exam', description: 'Examens nationaux du Baccalauréat' },
    { id: '9', title: 'Fête de l\'Indépendance', date: '2026-11-06', type: 'holiday', description: 'Fête de la Marche Verte' },
    { id: '10', title: 'Vacances de printemps', date: '2027-04-10', type: 'vacation', description: 'Vacances de printemps' }
  ]);

  getDaysInMonth(): number {
    return new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate();
  }

  getFirstDayOfMonth(): number {
    return new Date(this.currentYear(), this.currentMonth(), 1).getDay();
  }

  getEventsForDay(day: number): EventVm[] {
    const dateStr = `${this.currentYear()}-${String(this.currentMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.events().filter(e => e.date === dateStr);
  }

  getEventColor(type: string): string {
    const colors: { [key: string]: string } = {
      'exam': 'bg-red-500',
      'vacation': 'bg-green-500',
      'session': 'bg-blue-500',
      'holiday': 'bg-purple-500'
    };
    return colors[type] || 'bg-gray-500';
  }

  getEventIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'exam': '📝',
      'vacation': '🏖️',
      'session': '🎥',
      'holiday': '🎌'
    };
    return icons[type] || '📅';
  }

  prevMonth() {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.set(this.currentYear() - 1);
    } else {
      this.currentMonth.set(this.currentMonth() - 1);
    }
  }

  nextMonth() {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.set(this.currentYear() + 1);
    } else {
      this.currentMonth.set(this.currentMonth() + 1);
    }
  }

  selectEvent(event: EventVm) {
    this.selectedEvent.set(event);
  }

  closeModal() {
    this.selectedEvent.set(null);
  }

  upcomingEvents() {
    const today = new Date().toISOString().split('T')[0];
    return this.events()
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }
}
