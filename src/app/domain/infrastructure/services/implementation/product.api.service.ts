import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProductDomainEntity,
  IPurchaseProductRequest,
  IRegisterInventoryRequest,
  IRegisterProductRequest,
} from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IProductApiService } from '../interfaces';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';
import { IRegisterSaleRequest } from 'src/app/domain/domain/sales.model';

@Injectable()
export class ProductApiService implements IProductApiService {
  private URL_COMMAND = `${environment.apiCommands}/api/v1/product`;
  private URL_QUERY = `${environment.apiQueries}/api/v1/product`;

  constructor(private readonly httpClient: HttpClient) {}
  registerFinalCustomerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse> {
    return this.httpClient.patch<CommandResponse>(
      `${this.URL_COMMAND}/sale/customer`,
      sale
    );
  }
  registerResellerSale(
    sale: IRegisterSaleRequest
  ): Observable<CommandResponse> {
    sale.discount = 0.3;
    return this.httpClient.patch<CommandResponse>(
      `${this.URL_COMMAND}/sale/seller`,
      sale
    );
  }
  registerInventoryStock(
    newProduct: IRegisterInventoryRequest
  ): Observable<CommandResponse> {
    return this.httpClient.patch<CommandResponse>(
      `${this.URL_COMMAND}/purchase`,
      newProduct
    );
  }

  registerProduct(
    newProduct: IRegisterProductRequest
  ): Observable<CommandResponse> {
    return this.httpClient.post<CommandResponse>(
      `${this.URL_COMMAND}/register`,
      newProduct
    );
  }

  registerProductPurchase(
    newProduct: IPurchaseProductRequest
  ): Observable<CommandResponse> {
    return this.httpClient.patch<CommandResponse>(
      `${this.URL_COMMAND}/purchase`,
      newProduct
    );
  }

  getAllProducts(
    branchId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IProductDomainEntity[]> {
    return this.httpClient.get<IProductDomainEntity[]>(
      `${this.URL_QUERY}/all/${branchId}?page=${pagination.page}&pageSize=${pagination.pageSize}`
    );
  }
}
