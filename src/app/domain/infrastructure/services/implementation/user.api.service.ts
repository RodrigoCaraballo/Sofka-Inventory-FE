import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterUserRequest } from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IUserApiService } from '../interfaces';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';

@Injectable()
export class UserApiService implements IUserApiService {
  private URL_USER = `${environment.apiCommands}/api/v1/user`;

  constructor(private readonly httpClient: HttpClient) {}

  registerUser(newUser: IRegisterUserRequest): Observable<CommandResponse> {
    console.log(newUser);
    return this.httpClient.post<CommandResponse>(
      `${this.URL_USER}/register`,
      newUser
    );
  }
}
