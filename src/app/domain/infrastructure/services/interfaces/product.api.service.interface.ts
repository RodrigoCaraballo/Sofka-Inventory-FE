import { Observable } from 'rxjs';
import {
  IPurchaseProductRequest,
  IRegisterProductRequest,
  IRegisterProductResponse,
} from 'src/app/domain/domain';

export interface IProductApiService {
  registerProduct(
    newProduct: IRegisterProductRequest
  ): Observable<IRegisterProductResponse>;

  registerProductPurchase(
    newProduct: IPurchaseProductRequest
  ): Observable<IRegisterProductResponse>;

  getAllProducts(
    branchId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IRegisterProductResponse[]>;
}
