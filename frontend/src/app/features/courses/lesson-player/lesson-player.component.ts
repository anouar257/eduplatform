import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lesson-player',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-player.component.html'
})
export class LessonPlayerComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  sanitizer = inject(DomSanitizer);

  courseId: string | null = null;
  lessonId: string | null = null;
  
  // Mock data
  lesson = {
    id: 'l1',
    title: 'Introduction aux fractions',
    type: 'video', // 'video' | 'pdf'
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: '',
    content: 'Dans cette leçon, nous allons...',
    order: 1
  };
  
  courseProgress = 40; // mock 40%
  safeVideoUrl!: SafeResourceUrl;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('courseId');
      this.lessonId = params.get('lessonId');
      // TODO: fetch lesson details from backend
      
      if (this.lesson.videoUrl) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson.videoUrl);
      }
    });
  }

  markAsComplete() {
    // TODO: connect to EnrollmentService / backend
    console.log('Leçon marquée comme terminée', this.lessonId);
    alert('Progression enregistrée !');
    // Navigate to next lesson logic here
  }

  goBack() {
    this.router.navigate(['/courses', this.courseId]);
  }
}
