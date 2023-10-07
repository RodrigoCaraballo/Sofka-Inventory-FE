import { Observable } from 'rxjs';
import { IRegisterUserRequest } from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';

export interface IUserApiService {
  registerUser(newUser: IRegisterUserRequest): Observable<CommandResponse>;
}
