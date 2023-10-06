import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterBranchRequest, IRegisterBranchResponse } from '../domain';
import { HTTP_BRANCH_SERVICE } from '../infrastructure/providers';
import { IBranchApiService } from '../infrastructure/services/interfaces';

@Injectable({ providedIn: 'root' })
export class RegisterBranchUseCase {
  constructor(
    @Inject(HTTP_BRANCH_SERVICE)
    private readonly userApiService: IBranchApiService
  ) {}

  execute(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse> {
    return this.userApiService.registerBranch(newBranch);
  }
}
