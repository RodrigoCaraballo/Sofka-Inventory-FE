import { Observable } from 'rxjs';
import {
  IRegisterUserRequest,
  IRegisterUserResponse,
} from 'src/app/domain/domain';

export interface IUserApiService {
  registerUser(
    newUser: IRegisterUserRequest
  ): Observable<IRegisterUserResponse>;
}
