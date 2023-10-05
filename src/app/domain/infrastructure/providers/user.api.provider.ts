import { InjectionToken } from '@angular/core';
import { IBranchApiService } from '../services/interfaces/branch.api.service.interface';

export const HTTP_USER_SERVICE = new InjectionToken<IBranchApiService>(
  'BranchApiService'
);
