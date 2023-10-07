import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranchDomainEntity } from '../domain';
import { IBranchApiService } from '../infrastructure/services';
import { HTTP_BRANCH_SERVICE } from '../infrastructure/providers';

@Injectable({ providedIn: 'root' })
export class GetBranchUseCase {
  constructor(
    @Inject(HTTP_BRANCH_SERVICE)
    private readonly branchApiService: IBranchApiService
  ) {}

  execute(branchId: string): Observable<IBranchDomainEntity> {
    return this.branchApiService.getBranch(branchId);
  }
}
