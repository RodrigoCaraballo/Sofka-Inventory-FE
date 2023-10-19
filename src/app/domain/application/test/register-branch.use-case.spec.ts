import { of } from 'rxjs';
import { IRegisterBranchRequest, IRegisterBranchResponse } from '../../domain';
import { IBranchApiService } from '../../infrastructure';
import { RegisterBranchUseCase } from '../register-branch.use-case';

describe('RegisterBranchUseCase', () => {
  let useCase: RegisterBranchUseCase;
  let service: IBranchApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IBranchApiService', ['registerBranch']);
    useCase = new RegisterBranchUseCase(service);
  });

  it('should call service.registerBranch with the provided data and return the result', (done) => {
    const data: IRegisterBranchRequest = {
      name: 'test',
      city: 'test',
      country: 'test',
    };

    const expectedResponse: IRegisterBranchResponse = {
      ...data,
      id: '1234',
    };

    (service.registerBranch as jasmine.Spy).and.returnValue(
      of(expectedResponse)
    );

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerBranch).toHaveBeenCalledWith(data);
      done();
    });
  });
});
