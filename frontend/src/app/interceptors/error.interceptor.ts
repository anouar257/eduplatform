import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap, BehaviorSubject, filter, take } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Auto-refresh logic for 401 Unauthorized
      if (error.status === 401 && !req.url.includes('/api/auth/login') && !req.url.includes('/api/auth/refresh-token')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap((newTokens) => {
              isRefreshing = false;
              refreshTokenSubject.next(newTokens.token || null);
              
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newTokens.token}` }
              });
              return next(clonedReq);
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              authService.clearSession();
              toast.warning('🔐 Session expirée. Veuillez vous reconnecter.');
              return throwError(() => refreshError);
            })
          );
        } else {
          // Wait for token refresh to complete, then retry
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              });
              return next(clonedReq);
            })
          );
        }
      }

      // Standard error mapping
      let message = 'Erreur inconnue. Veuillez réessayer.';

      if (error.status === 0) {
        message = '🔌 Serveur inaccessible. Vérifiez que le backend est lancé.';
        toast.error(message, 5000);
      } else if (error.status === 401) {
        message = '🔐 Session expirée ou identifiants incorrects.';
        toast.warning(message);
      } else if (error.status === 403) {
        message = '🚫 Accès refusé. Vous n\'avez pas les permissions nécessaires.';
        toast.error(message);
      } else if (error.status === 404) {
        message = '🔍 Ressource introuvable.';
        toast.info(message);
      } else if (error.status === 409) {
        message = error.error?.error || 'Conflit : cette ressource existe déjà.';
        toast.warning(message);
      } else if (error.status >= 500) {
        message = '💥 Erreur serveur. Contactez l\'administrateur.';
        toast.error(message, 5000);
      }

      return throwError(() => error);
    })
  );
};
