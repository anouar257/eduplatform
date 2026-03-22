import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export type UserRole = 'guest' | 'student' | 'teacher' | 'parent' | 'admin';

export type UserVm = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isLoggedIn = signal(false);
  currentUser = signal<UserVm | null>(null);

  userInitials = () => {
    const user = this.currentUser();
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  userRole = () => this.currentUser()?.role ?? 'guest';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  constructor(private router: Router) {}
}
