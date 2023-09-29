import { InjectionToken } from '@angular/core';
import { IBranchApiService } from '../services/interfaces/branch.api.service.interface';

export const HTTP_BRANCH_SERVICE = new InjectionToken<IBranchApiService>(
  'BranchApiService'
);
