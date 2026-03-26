import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-live-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-live-session.component.html'
})
export class CreateLiveSessionComponent {
  router = inject(Router);

  session = {
    title: '',
    date: '',
    time: '',
    meetUrl: '',
    description: ''
  };

  onSubmit() {
    // TODO: connect to backend to schedule session
    console.log('Session scheduled:', this.session);
    this.router.navigate(['/teacher']);
  }
}
