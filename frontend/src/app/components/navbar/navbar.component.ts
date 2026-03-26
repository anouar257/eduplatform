import { Component, signal, computed, HostListener, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  themeService = inject(ThemeService);
  private subscription = new Subscription();

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isLoggedIn = signal(false);
  currentUserData = signal<{ firstName: string; lastName: string; email: string; role: string } | null>(null);

  userInitials = computed(() => {
    const user = this.currentUserData();
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  userRole = computed(() => this.currentUserData()?.role ?? 'guest');
  isDarkMode = computed(() => this.themeService.isDark());

  ngOnInit() {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.isLoggedIn.set(!!user);
        if (user) {
          this.currentUserData.set({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          });
        } else {
          this.currentUserData.set(null);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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

  toggleTheme() {
    this.themeService.toggle();
  }

  logout() {
    this.authService.logout();
    this.closeMobileMenu();
  }
}

