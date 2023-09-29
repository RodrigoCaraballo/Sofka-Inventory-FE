import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from '../domain/branch.model';
import { HTTP_BRANCH_SERVICE } from '../infrastructure/providers/branch.api.provider';
import { IBranchApiService } from '../infrastructure/services/interfaces/branch.api.service.interface';

@Injectable({ providedIn: 'root' })
export class RegisterBranchUseCase {
  constructor(
    @Inject(HTTP_BRANCH_SERVICE)
    private readonly branchApiService: IBranchApiService
  ) {}

  execute(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse> {
    return this.branchApiService.registerBranch(newBranch);
  }
}
