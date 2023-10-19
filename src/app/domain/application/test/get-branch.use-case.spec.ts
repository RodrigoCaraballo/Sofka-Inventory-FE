import { of } from 'rxjs';
import { IBranch } from '../../domain';
import { IBranchApiService } from '../../infrastructure';
import { GetBranchUseCase } from '../get-branch.use-case';

describe('GetBranchUseCase', () => {
  let useCase: GetBranchUseCase;
  let service: IBranchApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IBranchApiService', ['getBranch']);
    useCase = new GetBranchUseCase(service);
  });

  it('should call service.getBranch with the provided data and return the result', (done) => {
    const branchId = '1234';

    const expectedResponse: IBranch = {
      id: '1234',
      products: [],
      city: 'London',
      country: 'United',
      employees: [],
      name: 'Employ',
    };

    (service.getBranch as jasmine.Spy).and.returnValue(of(expectedResponse));

    useCase.execute(branchId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.getBranch).toHaveBeenCalledWith(branchId);
      done();
    });
  });
});
