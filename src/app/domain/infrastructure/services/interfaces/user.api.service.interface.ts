import { Observable } from 'rxjs';
import { CommandResponse, RegisterUserData } from 'src/app/domain/domain';

export interface IUserApiService {
  registerUser(newUser: RegisterUserData): Observable<CommandResponse>;
}
