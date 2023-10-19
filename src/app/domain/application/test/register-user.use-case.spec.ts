import { of } from 'rxjs';
import { CommandResponse, RegisterUserData } from '../../domain';
import { IUserApiService } from '../../infrastructure/services/interfaces/user.api.service.interface';
import { RegisterUserUseCase } from '../register-user.use-case';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let service: IUserApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IProductApiService', ['registerUser']);
    useCase = new RegisterUserUseCase(service);
  });

  it('should call service.registerUser with the provided data and return the result', (done) => {
    const data: RegisterUserData = {
      branchId: '12',
      email: 'test@example.com',
      lastName: 'test',
      name: 'test',
      password: 'test',
      role: 'admin',
    };

    const expectedResponse: CommandResponse = {
      statusCode: 200,
      success: true,
    };

    (service.registerUser as jasmine.Spy).and.returnValue(of(expectedResponse));

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerUser).toHaveBeenCalledWith(data);
      done();
    });
  });
});
