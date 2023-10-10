import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRegisterInventoryRequest,
  IRegisterProductRequest,
  IRegisterSaleRequest,
} from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';
import { IProductApiService } from '../interfaces/product.api.service.interface';

@Injectable()
export class ProductApiService implements IProductApiService {
  private URL_BRANCH_COMMAND = `http://${window._env.COMMAND_API}/api/v1/product`;

  constructor(private readonly httpClient: HttpClient) {}
  registerFinalCustomerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse> {
    return this.httpClient.post<CommandResponse>(
      `${this.URL_BRANCH_COMMAND}/customer-sale`,
      sale
    );
  }
  registerResellerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse> {
    return this.httpClient.post<CommandResponse>(
      `${this.URL_BRANCH_COMMAND}/reseller-sale`,
      sale
    );
  }

  registerProduct(
    product: IRegisterProductRequest
  ): Observable<CommandResponse> {
    return this.httpClient.post<CommandResponse>(
      `${this.URL_BRANCH_COMMAND}/register`,
      product
    );
  }

  registerInventoryStock(
    inventoryStock: IRegisterInventoryRequest
  ): Observable<CommandResponse> {
    return this.httpClient.post<CommandResponse>(
      `${this.URL_BRANCH_COMMAND}/purchase`,
      inventoryStock
    );
  }
}
