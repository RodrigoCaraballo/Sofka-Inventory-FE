import { Observable } from 'rxjs';
import {
  IBranch,
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain/branch.model';

export interface IBranchApiService {
  registerBranch(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse>;

  getBranch(branchId: string): Observable<IBranch>;

  getBranches(): Observable<IBranch[]>;
}
