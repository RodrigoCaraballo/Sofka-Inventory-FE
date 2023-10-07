import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_BRANCH_SERVICE } from '../infrastructure/providers';
import { BranchApiService } from '../infrastructure/services';
import { IBranchDomainEntity } from '../domain';

@Injectable({ providedIn: 'root' })
export class GetAllBranchesUseCase {
  constructor(
    @Inject(HTTP_BRANCH_SERVICE)
    private readonly branchApiService: BranchApiService
  ) {}

  execute(): Observable<IBranchDomainEntity[]> {
    return this.branchApiService.getAllBranches();
  }
}
