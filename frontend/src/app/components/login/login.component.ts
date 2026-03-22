import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services';
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
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage.set('Email ou mot de passe incorrect');
        this.isLoading.set(false);
      }
    });
  }
}
