import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterUserRequest } from '../domain';
import { HTTP_USER_SERVICE } from '../infrastructure/providers';
import { IUserApiService } from '../infrastructure/services/interfaces';
import { CommandResponse } from '../domain/reponse.model';

@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  constructor(
    @Inject(HTTP_USER_SERVICE)
    private readonly userApiService: IUserApiService
  ) {}

  execute(newUser: IRegisterUserRequest): Observable<CommandResponse> {
    return this.userApiService.registerUser(newUser);
  }
}
