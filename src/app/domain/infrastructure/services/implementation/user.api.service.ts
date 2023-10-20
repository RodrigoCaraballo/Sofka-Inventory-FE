import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponse, RegisterUserData } from 'src/app/domain/domain';
import { IUserApiService } from '../interfaces/user.api.service.interface';

@Injectable()
export class UserApiService implements IUserApiService {
  private URL_USER_QUERY = `http://${window._env.COMMAND_API}/api/v1/user`;

  constructor(private readonly httpClient: HttpClient) {}

  registerUser(newUser: RegisterUserData): Observable<CommandResponse> {
    const token = localStorage.getItem('token');
    return this.httpClient.post<CommandResponse>(
      `${this.URL_USER_QUERY}/register`,
      newUser,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}
