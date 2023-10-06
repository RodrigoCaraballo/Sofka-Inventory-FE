import { Observable } from 'rxjs';
import {
  IRegisterProductRequest,
  IRegisterProductResponse,
} from 'src/app/domain/domain';

export interface IProductApiService {
  registerProduct(
    newProduct: IRegisterProductRequest
  ): Observable<IRegisterProductResponse>;
}
