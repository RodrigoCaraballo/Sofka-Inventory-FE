import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponse, RegisterUserData } from '../domain';
import { HTTP_USER_SERVICE } from '../infrastructure/providers/user.api.provider';
import { IUserApiService } from '../infrastructure/services/interfaces/user.api.service.interface';

@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  constructor(
    @Inject(HTTP_USER_SERVICE) private readonly userApiService: IUserApiService
  ) {}

  execute(auth: RegisterUserData): Observable<CommandResponse> {
    return this.userApiService.registerUser(auth);
  }
}
