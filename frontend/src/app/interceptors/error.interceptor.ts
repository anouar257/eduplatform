import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Erreur inconnue. Veuillez réessayer.';

      if (error.status === 0) {
        message = '🔌 Serveur inaccessible. Vérifiez que le backend est lancé.';
        toast.error(message, 5000);
      } else if (error.status === 401) {
        message = '🔐 Session expirée. Veuillez vous reconnecter.';
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
