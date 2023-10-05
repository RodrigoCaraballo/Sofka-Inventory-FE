import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterUserRequest, IRegisterUserResponse } from '../domain';
import { HTTP_USER_SERVICE } from '../infrastructure/providers';
import { IUserApiService } from '../infrastructure/services';

@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  constructor(
    @Inject(HTTP_USER_SERVICE)
    private readonly branchApiService: IUserApiService
  ) {}

  execute(newUser: IRegisterUserRequest): Observable<IRegisterUserResponse> {
    return this.branchApiService.registerUser(newUser);
  }
}
