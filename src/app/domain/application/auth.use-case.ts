import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData, AuthResponse } from '../domain/auth.model';
import { HTTP_AUTH_SERVICE } from '../infrastructure/providers/auth.api.provider';
import { IAuthApiService } from '../infrastructure/services/interfaces/auth.api.service.interface';

@Injectable({ providedIn: 'root' })
export class AuthUseCase {
  constructor(
    @Inject(HTTP_AUTH_SERVICE) private readonly authService: IAuthApiService
  ) {}

  execute(auth: AuthData): Observable<AuthResponse> {
    return this.authService.auth(auth);
  }
}
