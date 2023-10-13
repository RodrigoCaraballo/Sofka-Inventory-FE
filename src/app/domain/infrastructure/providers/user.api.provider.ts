import { InjectionToken } from '@angular/core';
import { IUserApiService } from '../services/interfaces/user.api.service.interface';

export const HTTP_USER_SERVICE = new InjectionToken<IUserApiService>(
  'UserApiService'
);
