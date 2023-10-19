import { Observable } from 'rxjs';
import {
  IRegisterInventoryRequest,
  IRegisterProductRequest,
  IRegisterSaleRequest,
  RegisterReturnSaleData,
} from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';

export interface IProductApiService {
  registerProduct(
    product: IRegisterProductRequest
  ): Observable<CommandResponse>;

  registerInventoryStock(
    inventoryStocks: IRegisterInventoryRequest[]
  ): Observable<CommandResponse>;

  registerFinalCustomerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse>;
  registerResellerSale(sale: IRegisterSaleRequest): Observable<CommandResponse>;

  registerReturnSale(
    returnSale: RegisterReturnSaleData
  ): Observable<CommandResponse>;
}
