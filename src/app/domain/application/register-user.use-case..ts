import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterUserRequest, IRegisterUserResponse } from '../domain';
import { HTTP_USER_SERVICE } from '../infrastructure/providers';
import { IUserApiService } from '../infrastructure/services/interfaces';

@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  constructor(
    @Inject(HTTP_USER_SERVICE)
    private readonly userApiService: IUserApiService
  ) {}

  execute(newUser: IRegisterUserRequest): Observable<IRegisterUserResponse> {
    return this.userApiService.registerUser(newUser);
  }
}
