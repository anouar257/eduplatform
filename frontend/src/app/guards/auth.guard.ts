import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    const expectedRoles = route.data['roles'] as Array<string>;
    
    if (expectedRoles && expectedRoles.length > 0) {
      const userRole = authService.userRole;
      if (!expectedRoles.includes(userRole)) {
        // Si l'utilisateur n'a pas le bon rôle, on le redirige vers l'accueil ou le login
        router.navigate(['/']);
        return false;
      }
    }
    return true;
  }

  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};
