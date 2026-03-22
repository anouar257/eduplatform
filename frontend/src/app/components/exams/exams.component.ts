import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type ExamVm = {
  id: string;
  title: string;
  description: string;
  subjectName: string;
  levelName: string;
  duration: number;
  questionCount: number;
  totalMarks: number;
  passingMarks: number;
  scheduledAt: string | null;
};

export type LevelVm = {
  id: string;
  name: string;
};

export type SubjectVm = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent {
  isLoading = signal(true);
  selectedLevelId = signal('');
  selectedSubjectId = signal('');

  levels = signal<LevelVm[]>([
    { id: '1', name: '1ère année' },
    { id: '2', name: '2ème année' },
    { id: '3', name: '3ème année' },
    { id: '4', name: 'Baccalauréat' }
  ]);

  subjects = signal<SubjectVm[]>([
    { id: '1', name: 'Mathématiques' },
    { id: '2', name: 'Physique' },
    { id: '3', name: 'Chimie' },
    { id: '4', name: 'Français' },
    { id: '5', name: 'Arabe' },
    { id: '6', name: 'Anglais' },
    { id: '7', name: 'Histoire-Géographie' },
    { id: '8', name: 'Sciences Naturelles' }
  ]);

  private allExams = signal<ExamVm[]>([
    {
      id: 'e1',
      title: 'Algèbre — Équations et inéquations',
      description: 'Examen sur les équations du 1er et 2ème degré, et les inéquations.',
      subjectName: 'Mathématiques',
      levelName: '2ème année',
      duration: 60,
      questionCount: 20,
      totalMarks: 100,
      passingMarks: 50,
      scheduledAt: '2026-03-25T09:00:00'
    },
    {
      id: 'e2',
      title: 'Physique — Lois de Newton',
      description: 'Examen sur les trois lois de Newton et leurs applications.',
      subjectName: 'Physique',
      levelName: '1ère année',
      duration: 45,
      questionCount: 15,
      totalMarks: 75,
      passingMarks: 40,
      scheduledAt: null
    },
    {
      id: 'e3',
      title: 'Français — Compréhension et expression',
      description: 'Évaluation de la compréhension de texte et de la production écrite.',
      subjectName: 'Français',
      levelName: 'Toutes années',
      duration: 90,
      questionCount: 25,
      totalMarks: 100,
      passingMarks: 50,
      scheduledAt: '2026-03-28T14:00:00'
    },
    {
      id: 'e4',
      title: 'Chimie — Réactions chimiques',
      description: 'Examen sur les réactions chimiques et les équations bilan.',
      subjectName: 'Chimie',
      levelName: '2ème année',
      duration: 45,
      questionCount: 18,
      totalMarks: 90,
      passingMarks: 45,
      scheduledAt: null
    }
  ]);

  filteredExams = computed(() => {
    let exams = this.allExams();
    const levelId = this.selectedLevelId();
    const subjectId = this.selectedSubjectId();

    if (levelId) {
      exams = exams.filter(e => e.levelName.includes(this.levels().find(l => l.id === levelId)?.name || ''));
    }
    if (subjectId) {
      exams = exams.filter(e => e.subjectName === this.subjects().find(s => s.id === subjectId)?.name);
    }
    return exams;
  });

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  onFilterChange() {
    // Filtering is reactive via computed signal
  }

  clearFilters() {
    this.selectedLevelId.set('');
    this.selectedSubjectId.set('');
  }
}
