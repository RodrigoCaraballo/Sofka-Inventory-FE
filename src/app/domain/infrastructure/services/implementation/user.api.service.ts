import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRegisterUserRequest,
  IRegisterUserResponse,
} from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IUserApiService } from '../interfaces';

@Injectable()
export class UserApiService implements IUserApiService {
  private URL_USER = `${environment.apiCommands}/api/v1/user`;

  constructor(private readonly httpClient: HttpClient) {}

  registerUser(
    newUser: IRegisterUserRequest
  ): Observable<IRegisterUserResponse> {
    return this.httpClient.post<IRegisterUserResponse>(
      `${this.URL_USER}/register`,
      newUser
    );
  }
}
