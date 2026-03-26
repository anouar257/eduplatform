import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services';
import { RegisterRequest } from '../../models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = inject(FormBuilder).group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['student', [Validators.required]]
  });

  isLoading = signal(false);
  errorMessage = signal('');

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const registerData: RegisterRequest = {
      firstName: this.registerForm.value.firstName || '',
      lastName: this.registerForm.value.lastName || '',
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      role: (this.registerForm.value.role || 'student') as RegisterRequest['role']
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        const role = this.authService.userRole;
        let route = '/dashboard'; // default student dashboard
        
        if (role === 'teacher') route = '/teacher';
        else if (role === 'parent') route = '/parent';
        else if (role === 'admin') route = '/admin';
        
        this.router.navigate([route]);
      },
      error: () => {
        this.errorMessage.set("L'inscription a échoué. Veuillez réessayer.");
        this.isLoading.set(false);
      }
    });
  }
}
