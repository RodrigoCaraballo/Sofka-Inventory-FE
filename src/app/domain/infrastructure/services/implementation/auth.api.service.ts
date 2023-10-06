import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData, AuthReponse } from 'src/app/domain/domain/auth.model';
import { environment } from 'src/environments/environment';
import { IAuthApiService } from '../interfaces/auth.api.service.interface';

@Injectable()
export class AuthApiService implements IAuthApiService {
  private URL_BRANCH_COMMAND = environment.commandApi + '/api/v1/auth';

  constructor(private readonly httpClient: HttpClient) {}
  auth(auth: AuthData): Observable<AuthReponse> {
    return this.httpClient.post<AuthReponse>(
      `${this.URL_BRANCH_COMMAND}`,
      auth
    );
  }
}
