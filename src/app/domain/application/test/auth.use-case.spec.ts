import { of } from 'rxjs';
import { AuthData, AuthReponse } from '../../domain';
import { IAuthApiService } from '../../infrastructure/services/interfaces/auth.api.service.interface';
import { AuthUseCase } from '../auth.use-case';

describe('AuthUseCase', () => {
  let authUseCase: AuthUseCase;
  let authService: IAuthApiService;

  beforeEach(() => {
    authService = jasmine.createSpyObj('IAuthApiService', ['auth']);
    authUseCase = new AuthUseCase(authService);
  });

  it('should call authService.auth with the provided auth data and return the result', (done) => {
    const authData: AuthData = {
      email: 'email@example.com',
      password: 'password',
    };

    const expectedResponse: AuthReponse = {
      token: 'token',
    };

    (authService.auth as jasmine.Spy).and.returnValue(of(expectedResponse));

    authUseCase.execute(authData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(authService.auth).toHaveBeenCalledWith(authData);
      done();
    });
  });
});
