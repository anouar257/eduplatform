import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, throwError } from 'rxjs';
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
    this.loadUserFromStorage();
  }

  /** On startup, check if we have a saved token and fetch user info */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.http.get<AuthResponse>(`${this.apiUrl}/me`).subscribe({
        next: (response) => {
          this.currentUserSubject.next(response.user);
        },
        error: () => {
          // Error interceptor will attempt to refresh. If it fails, session is cleared there.
        }
      });
    }
  }

  private saveTokens(response: AuthResponse): void {
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    if (response.refreshToken) {
      localStorage.setItem('refresh_token', response.refreshToken);
    }
    if (response.user) {
      this.currentUserSubject.next(response.user);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearSession();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap({
        next: (response) => this.saveTokens(response),
        error: () => this.clearSession()
      })
    );
  }

  logout(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
        complete: () => this.clearSession()
      });
    } else {
      this.clearSession();
    }
  }

  clearSession(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
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

  get token(): string | null {
    return localStorage.getItem('auth_token');
  }
}
