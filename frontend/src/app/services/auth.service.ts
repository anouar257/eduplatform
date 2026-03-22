import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUserSubject.asObservable().pipe(
    map(user => !!user)
  );
  public userRole$ = this.currentUserSubject.asObservable().pipe(
    map(user => user?.role || 'guest')
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.http.get<AuthResponse>(`${this.apiUrl}/me`).subscribe({
      next: (response) => {
        this.currentUserSubject.next(response.user);
      },
      error: () => {
        this.currentUserSubject.next(null);
      }
    });
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      complete: () => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      }
    });
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get userRole(): string {
    return this.currentUserSubject.value?.role || 'guest';
  }
}
