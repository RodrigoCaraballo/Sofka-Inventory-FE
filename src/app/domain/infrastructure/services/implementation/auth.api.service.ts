import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData, AuthResponse } from 'src/app/domain/domain/auth.model';
import { environment } from 'src/environments/environment';
import { IAuthApiService } from '../interfaces/auth.api.service.interface';

@Injectable()
export class AuthApiService implements IAuthApiService {
  private URL_BRANCH_COMMAND = environment.apiCommands + '/api/v1/user';

  constructor(private readonly httpClient: HttpClient) {}
  auth(auth: AuthData): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.URL_BRANCH_COMMAND}/login`,
      auth
    );
  }
}
