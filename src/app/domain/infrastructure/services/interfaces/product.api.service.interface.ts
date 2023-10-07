import { Observable } from 'rxjs';
import {
  IProductDomainEntity,
  IPurchaseProductRequest,
  IRegisterInventoryRequest,
  IRegisterProductRequest,
  IRegisterProductResponse,
} from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';
import { IRegisterSaleRequest } from 'src/app/domain/domain/sales.model';

export interface IProductApiService {
  registerProduct(
    newProduct: IRegisterProductRequest
  ): Observable<CommandResponse>;

  registerProductPurchase(
    newProduct: IPurchaseProductRequest
  ): Observable<CommandResponse>;

  getAllProducts(
    branchId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IProductDomainEntity[]>;

  registerInventoryStock(
    newProduct: IRegisterInventoryRequest
  ): Observable<CommandResponse>;

  registerFinalCustomerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse>;
  registerResellerSale(sale: IRegisterSaleRequest): Observable<CommandResponse>;
}
