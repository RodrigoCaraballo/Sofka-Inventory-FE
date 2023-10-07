import { Observable } from 'rxjs';
import { AuthData, AuthResponse } from 'src/app/domain/domain/auth.model';

export interface IAuthApiService {
  auth(auth: AuthData): Observable<AuthResponse>;
}
