import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // Add withCredentials to all requests for cookie-based authentication
  const authReq = req.clone({
    withCredentials: true,
    setHeaders: {
      'Content-Type': 'application/json',
    }
  });
  
  return next(authReq);
};
