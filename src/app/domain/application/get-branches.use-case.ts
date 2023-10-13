import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from '../domain';
import { HTTP_BRANCH_SERVICE, IBranchApiService } from '../infrastructure';

@Injectable({ providedIn: 'root' })
export class GetBranchesUseCase {
  constructor(
    @Inject(HTTP_BRANCH_SERVICE)
    private readonly branchApiService: IBranchApiService
  ) {}

  execute(): Observable<IBranch[]> {
    return this.branchApiService.getBranches();
  }
}
