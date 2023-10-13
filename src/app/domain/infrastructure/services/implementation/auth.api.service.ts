import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData, AuthReponse } from 'src/app/domain/domain/auth.model';
import { IAuthApiService } from '../interfaces/auth.api.service.interface';

@Injectable()
export class AuthApiService implements IAuthApiService {
  private URL_AUTH_COMMAND = `http://${window._env.AUTH_API}/api/v1/auth`;

  constructor(private readonly httpClient: HttpClient) {}
  auth(auth: AuthData): Observable<AuthReponse> {
    return this.httpClient.post<AuthReponse>(`${this.URL_AUTH_COMMAND}`, auth);
  }
}
