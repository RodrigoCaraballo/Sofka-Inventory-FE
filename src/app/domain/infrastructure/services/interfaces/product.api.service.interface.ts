import { Observable } from 'rxjs';
import {
  IRegisterInventoryRequest,
  IRegisterProductRequest,
  IRegisterSaleRequest,
} from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';

export interface IProductApiService {
  registerProduct(
    product: IRegisterProductRequest
  ): Observable<CommandResponse>;

  registerInventoryStock(
    inventoryStock: IRegisterInventoryRequest
  ): Observable<CommandResponse>;

  registerFinalCustomerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse>;
  registerResellerSale(sale: IRegisterSaleRequest): Observable<CommandResponse>;
}
