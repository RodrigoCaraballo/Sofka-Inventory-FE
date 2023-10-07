import { InjectionToken } from '@angular/core';
import { IAuthApiService } from '../services/interfaces/auth.api.service.interface';

export const HTTP_AUTH_SERVICE = new InjectionToken<IAuthApiService>(
  'AuthApiService'
);
