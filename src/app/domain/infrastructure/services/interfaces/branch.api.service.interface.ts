import { Observable } from 'rxjs';
import {
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain/branch.model';

export interface IBranchApiService {
  registerBranch(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse>;
}
