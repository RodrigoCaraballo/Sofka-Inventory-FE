import { InjectionToken, Provider } from '@angular/core';
import { BranchApiService } from '../services/implementation/branch.api.service';
import { IBranchApiService } from '../services/interfaces/branch.api.service.interface';

export const HTTP_BRANCH_SERVICE = new InjectionToken<IBranchApiService>(
  'BranchApiService'
);
export const BRANCH_API_PROVIDER: Provider = {
  provide: HTTP_BRANCH_SERVICE,
  useClass: BranchApiService,
};
