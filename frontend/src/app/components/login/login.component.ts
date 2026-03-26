import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services';
import { ToastService } from '../../services/toast.service';
import { LoginRequest } from '../../models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  
  isLoading = signal(false);
  errorMessage = signal('');

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const loginData: LoginRequest = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        const role = this.authService.userRole;
        this.toastService.success(`Bienvenue ! Connecté en tant que ${role}`);
        
        let route = '/dashboard'; // default student dashboard
        
        if (role === 'teacher') route = '/teacher';
        else if (role === 'parent') route = '/parent';
        else if (role === 'admin') route = '/admin';
        
        this.router.navigate([route]);
      },
      error: (err) => {
        const message = err?.error?.error || 'Email ou mot de passe incorrect';
        this.errorMessage.set(message);
        this.toastService.error(message);
        this.isLoading.set(false);
      }
    });
  }
}

