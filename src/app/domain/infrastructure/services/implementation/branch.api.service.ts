import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBranch,
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain/branch.model';
import { IBranchApiService } from '../interfaces/branch.api.service.interface';

@Injectable()
export class BranchApiService implements IBranchApiService {
  private URL_BRANCH_COMMAND = `http://${window._env.COMMAND_API}/api/v1/branch`;
  private URL_BRANCH_QUERY = `http://${window._env.QUERY_API}/api/v1/branch`;

  constructor(private readonly httpClient: HttpClient) {}

  registerBranch(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse> {
    return this.httpClient.post<IRegisterBranchResponse>(
      `${this.URL_BRANCH_COMMAND}/register`,
      newBranch
    );
  }

  getBranch(branchId: string): Observable<IBranch> {
    return this.httpClient.get<IBranch>(
      `${this.URL_BRANCH_QUERY}/branch/${branchId}`
    );
  }
}
