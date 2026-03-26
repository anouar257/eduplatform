import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent {
  router = inject(Router);

  profile = {
    firstName: 'Élève',
    lastName: 'Demo',
    email: 'eleve@demo.com',
    avatarUrl: '',
    currentPassword: '',
    newPassword: ''
  };

  onSubmit() {
    // TODO: connect to backend profile update
    console.log('Profile updated', this.profile);
    alert('Profil mis à jour avec succès');
    this.router.navigate(['/dashboard']);
  }
}
