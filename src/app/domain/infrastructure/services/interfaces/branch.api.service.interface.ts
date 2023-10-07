import { Observable } from 'rxjs';
import {
  IBranchDomainEntity,
  IRegisterBranchRequest,
  IRegisterBranchResponse,
} from 'src/app/domain/domain/branch.model';

export interface IBranchApiService {
  registerBranch(
    newBranch: IRegisterBranchRequest
  ): Observable<IRegisterBranchResponse>;

  getBranch(branchId: string): Observable<IBranchDomainEntity>;

  getAllBranches(): Observable<IBranchDomainEntity[]>;
}
