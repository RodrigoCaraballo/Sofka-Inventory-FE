import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IBranchApiService } from '../interfaces';

@Injectable()
export class BranchApiService implements IBranchApiService {
  private URL_BRANCH = `${environment.apiCommands}/api/v1/branch`;

  constructor(private readonly httpClient: HttpClient) {}

  registerBranch(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse> {
    return this.httpClient.post<IRegisterBranchResponse>(
      `${this.URL_BRANCH}/register`,
      newBranch
    );
  }
}
