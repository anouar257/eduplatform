import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type LessonVm = {
  id: string;
  title: string;
  type: 'video' | 'summary' | 'pdf' | 'quiz';
  durationMin: number;
  isFree: boolean;
  videoUrl?: string;
  content?: string;
  pdfUrl?: string;
};

export type CourseDetailVm = {
  id: string;
  title: string;
  description: string;
  teacherName: string;
  categoryName: string;
  levelName: string;
  coverUrl: string;
  totalDurationMin: number;
  lessonCount: number;
  lessons: LessonVm[];
};

export type CommentVm = {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  rating: number;
};

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  isLoading = signal(true);
  activeTab = signal<'description' | 'resources'>('description');
  selectedLessonId = signal<string | null>(null);
  newComment = signal('');

  comments = signal<CommentVm[]>([
    {
      id: 'c1',
      userName: 'Youssef Amrani',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=60',
      content: 'Excellent cours ! Les explications sont très claires, j\'ai enfin compris les bases de l\'algèbre. Merci M. Amine !',
      date: '2026-03-18',
      rating: 5
    },
    {
      id: 'c2',
      userName: 'Sofia Benali',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=60',
      content: 'Très bon cours, bien structuré. Les exercices sont parfaits pour s\'entraîner. Je recommande !',
      date: '2026-03-15',
      rating: 4
    },
    {
      id: 'c3',
      userName: 'Ali El Fassi',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=60',
      content: 'Cours très complet, covers tous les points importants. Les résumés sont très utiles pour les révisions.',
      date: '2026-03-10',
      rating: 5
    }
  ]);

  private courseData = signal<CourseDetailVm | null>(null);

  course = computed(() => this.courseData());
  lessons = computed(() => this.courseData()?.lessons ?? []);

  totalDuration = computed(() => {
    const mins = this.courseData()?.totalDurationMin ?? 0;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  });

  constructor(private route: ActivatedRoute) {
    const courseId = this.route.snapshot.paramMap.get('id') ?? 'c1';

    this.courseData.set({
      id: courseId,
      title: 'Algèbre — Bases et exercices',
      description:
        'Ce cours couvre les fondamentaux de l\'algèbre : équations, polynômes, factorisations et systèmes d\'équations. Idéal pour les élèves de 2ème année souhaitant consolider leurs bases.',
      teacherName: 'M. Amine',
      categoryName: 'Mathématiques',
      levelName: '2ème année',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=60',
      totalDurationMin: 95,
      lessonCount: 8,
      lessons: [
        {
          id: 'l1',
          title: 'Introduction et concepts de base',
          type: 'video' as const,
          durationMin: 25,
          isFree: true,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: 'l2',
          title: 'Résumé du chapitre 1',
          type: 'summary' as const,
          durationMin: 15,
          isFree: true,
          content: 'Ce chapitre couvre les fondamentaux de l\'algèbre, incluant les variables, les équations linéaires et les propriétés des opérations mathématiques.'
        },
        {
          id: 'l3',
          title: 'Exercices pratiques',
          type: 'pdf' as const,
          durationMin: 30,
          isFree: false,
          pdfUrl: '/assets/exercises.pdf'
        },
        {
          id: 'l4',
          title: 'Quiz de validation',
          type: 'quiz' as const,
          durationMin: 20,
          isFree: false
        },
        {
          id: 'l5',
          title: 'Applications avancées',
          type: 'video' as const,
          durationMin: 35,
          isFree: false,
          videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4'
        }
      ]
    });

    setTimeout(() => this.isLoading.set(false), 500);
  }

  selectLesson(id: string) {
    this.selectedLessonId.set(id);
  }

  addComment() {
    if (!this.newComment().trim()) return;
    
    const newComment: CommentVm = {
      id: 'c' + Date.now(),
      userName: 'Vous',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60',
      content: this.newComment(),
      date: new Date().toISOString().split('T')[0],
      rating: 5
    };
    
    this.comments.set([newComment, ...this.comments()]);
    this.newComment.set('');
  }
}
