import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain/branch.model';
import { environment } from 'src/environments/environment';
import { IBranchApiService } from '../interfaces/branch.api.service.interface';

export class BranchApiService implements IBranchApiService {
  private URL_BRANCH = environment.api + '/api/v1/branch';

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
