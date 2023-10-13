import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JWTModel } from '../../domain';

export const isSuperAdmin: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const parsedToken: JWTModel = jwt_decode(token);
  if (parsedToken.userRole !== 'super admin') {
    router.navigate(['/home/products']);
    return false;
  }

  return true;
};
