import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export type SubjectVm = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type CourseVm = {
  id: string;
  title: string;
  description: string;
  teacherName: string;
  subjectName: string;
  levelName: string;
  lessonCount: number;
  duration: string;
  thumbnail: string;
  rating: number;
  isFree: boolean;
};

export type SessionVm = {
  id: string;
  title: string;
  teacherName: string;
  scheduledAt: string;
  status: string;
  duration: number;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = signal(true);
  currentSlideIndex = signal(0);
  activeTestimonialIndex = signal(0);
  private testimonialInterval: any;
  currentYear = new Date().getFullYear();

  testimonialCards = signal([
    {
      id: 1,
      image: 'assets/images/home/classroom.jpg',
      quote: "Une expérience d'apprentissage interactive qui m'a aidé à valider mon année avec mention.",
      author: "Youssef, Étudiant Universitaire",
      tag: "Apprentissage Collaboratif"
    },
    {
      id: 2,
      image: 'assets/images/home/student.jpg',
      quote: "Des centaines de cours en vidéo HD et des exercices pratiques pour s'entraîner à la maison.",
      author: "Sarah, Lycéenne",
      tag: "Autonomie & Succès"
    },
    {
      id: 3,
      image: 'assets/images/home/teacher.jpg',
      quote: "En tant que professeur, cette plateforme me permet d'accompagner mes élèves avec des outils de pointe.",
      author: "Prof. Khalid, Expert en Ingénierie",
      tag: "Pédagogie d'Excellence"
    }
  ]);

  subjects = signal<SubjectVm[]>([
    { id: '1', name: 'Mathématiques', icon: '📐', color: 'blue' },
    { id: '2', name: 'Physique-Chimie', icon: '⚗️', color: 'purple' },
    { id: '3', name: 'Français', icon: '📚', color: 'pink' },
    { id: '4', name: 'Arabe', icon: '📖', color: 'amber' },
    { id: '5', name: 'Sciences Naturelles', icon: '🌿', color: 'green' },
    { id: '6', name: 'Histoire-Géographie', icon: '🌍', color: 'orange' },
    { id: '7', name: 'Informatique', icon: '💻', color: 'cyan' },
    { id: '8', name: 'Anglais', icon: '🇬🇧', color: 'red' }
  ]);

  featuredCourses = signal<CourseVm[]>([
    {
      id: 'c1',
      title: 'Algèbre — Bases et exercices',
      description: 'Maîtrisez les fondamentaux de l\'algèbre avec des exercices pratiques et des explications claires.',
      teacherName: 'M. Amine',
      subjectName: 'Mathématiques',
      levelName: '2ème année',
      lessonCount: 12,
      duration: '8h 30min',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60',
      rating: 4.8,
      isFree: false
    },
    {
      id: 'c2',
      title: 'Physique — Mécanique newtonienne',
      description: 'Comprenez les lois de Newton et leurs applications dans la vie réelle.',
      teacherName: 'Mme Salma',
      subjectName: 'Physique',
      levelName: '1ère année',
      lessonCount: 10,
      duration: '6h 15min',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60',
      rating: 4.9,
      isFree: true
    },
    {
      id: 'c3',
      title: 'Français — Expression écrite',
      description: 'Améliorez votre rédaction et votre expression orale avec des techniques éprouvées.',
      teacherName: 'M. Pierre',
      subjectName: 'Français',
      levelName: 'Toutes années',
      lessonCount: 15,
      duration: '10h',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=60',
      rating: 4.7,
      isFree: false
    }
  ]);

  stats = signal({
    totalStudents: 12500,
    totalCourses: 248,
    totalTeachers: 45,
    upcomingLiveSessions: 12
  });

  upcomingSessions = signal<SessionVm[]>([
    {
      id: 's1',
      title: 'Correction du devoir de maths',
      teacherName: 'M. Amine',
      scheduledAt: '2026-03-22T14:00:00',
      status: 'live',
      duration: 60
    },
    {
      id: 's2',
      title: 'Physique — Cinématique',
      teacherName: 'Mme Salma',
      scheduledAt: '2026-03-23T10:00:00',
      status: 'scheduled',
      duration: 45
    },
    {
      id: 's3',
      title: 'Anglais — Conversation',
      teacherName: 'Ms. Sarah',
      scheduledAt: '2026-03-24T15:00:00',
      status: 'scheduled',
      duration: 30
    }
  ]);

  constructor(private router: Router) {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  ngOnInit() {
    // Auto-play for the testimonial photo deck
    this.testimonialInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  nextTestimonial() {
    this.activeTestimonialIndex.set((this.activeTestimonialIndex() + 1) % this.testimonialCards().length);
  }

  setTestimonial(index: number) {
    this.activeTestimonialIndex.set(index);
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
      this.testimonialInterval = setInterval(() => this.nextTestimonial(), 5000);
    }
  }

  exploreCourses() {
    this.router.navigate(['/courses']);
  }

  joinForFree() {
    this.router.navigate(['/register']);
  }

  enrollInCourse(courseId: string) {
    this.router.navigate(['/courses', courseId]);
  }

  joinSession(sessionId: string) {
    this.router.navigate(['/live-sessions']);
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
  }

  nextSlide() {
    const next = (this.currentSlideIndex() + 1) % this.featuredCourses().length;
    this.currentSlideIndex.set(next);
  }

  prevSlide() {
    const prev = (this.currentSlideIndex() - 1 + this.featuredCourses().length) % this.featuredCourses().length;
    this.currentSlideIndex.set(prev);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navigateToLevel(level: string) {
    this.router.navigate(['/courses'], { queryParams: { level: level } });
  }

  filterBySubject(subjectName: string) {
    this.router.navigate(['/courses'], { queryParams: { category: subjectName } });
  }
}
