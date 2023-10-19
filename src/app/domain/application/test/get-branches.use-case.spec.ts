import { of } from 'rxjs';
import { IBranch } from '../../domain';
import { IBranchApiService } from '../../infrastructure';
import { GetBranchesUseCase } from '../get-branches.use-case';

describe('GetBranchesUseCase', () => {
  let useCase: GetBranchesUseCase;
  let service: IBranchApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IBranchApiService', ['getBranches']);
    useCase = new GetBranchesUseCase(service);
  });

  it('should call service.getBranches with the provided data and return the result', (done) => {
    const expectedResponse: IBranch[] = [
      {
        id: '1234',
        products: [],
        city: 'London',
        country: 'United',
        employees: [],
        name: 'Employ',
      },
    ];

    (service.getBranches as jasmine.Spy).and.returnValue(of(expectedResponse));

    useCase.execute().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.getBranches).toHaveBeenCalledWith();
      done();
    });
  });
});
