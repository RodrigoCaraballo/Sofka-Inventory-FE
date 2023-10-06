import { Observable } from 'rxjs';
import { AuthData, AuthReponse } from 'src/app/domain/domain/auth.model';

export interface IAuthApiService {
  auth(auth: AuthData): Observable<AuthReponse>;
}
