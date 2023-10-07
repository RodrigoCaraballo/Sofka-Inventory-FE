import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBranchDomainEntity,
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IBranchApiService } from '../interfaces';

@Injectable()
export class BranchApiService implements IBranchApiService {
  private URL_COMMAND = `${environment.apiCommands}/api/v1/branch`;
  private URL_QUERY = `${environment.apiQueries}/api/v1/branch`;

  constructor(private readonly httpClient: HttpClient) {}

  registerBranch(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse> {
    return this.httpClient.post<IRegisterBranchResponse>(
      `${this.URL_COMMAND}/register`,
      newBranch
    );
  }

  getBranch(branchId: string): Observable<IBranchDomainEntity> {
    return this.httpClient.get<IBranchDomainEntity>(
      `${this.URL_QUERY}/${branchId}`
    );
  }

  getAllBranches(): Observable<IBranchDomainEntity[]> {
    return this.httpClient.get<IBranchDomainEntity[]>(
      `${this.URL_QUERY}/get/all`
    );
  }
}
