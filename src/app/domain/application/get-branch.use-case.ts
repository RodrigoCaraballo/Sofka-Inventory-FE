import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from '../domain';
import { HTTP_BRANCH_SERVICE, IBranchApiService } from '../infrastructure';

@Injectable({ providedIn: 'root' })
export class GetBranchUseCase {
  constructor(
    @Inject(HTTP_BRANCH_SERVICE)
    private readonly branchApiService: IBranchApiService
  ) {}

  execute(branchId: string): Observable<IBranch> {
    return this.branchApiService.getBranch(branchId);
  }
}
