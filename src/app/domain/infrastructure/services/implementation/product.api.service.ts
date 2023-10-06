import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProductDomainEntity,
  IPurchaseProductRequest,
  IPurchaseProductResponse,
  IRegisterProductRequest,
  IRegisterProductResponse,
} from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IProductApiService } from '../interfaces';

@Injectable()
export class ProductApiService implements IProductApiService {
  private URL_COMMAND = `${environment.apiCommands}/api/v1/product`;
  private URL_QUERY = `${environment.apiQueries}/api/v1/product`;

  constructor(private readonly httpClient: HttpClient) {}

  registerProduct(
    newProduct: IRegisterProductRequest
  ): Observable<IRegisterProductResponse> {
    return this.httpClient.post<IRegisterProductResponse>(
      `${this.URL_COMMAND}/register`,
      newProduct
    );
  }

  registerProductPurchase(
    newProduct: IPurchaseProductRequest
  ): Observable<IPurchaseProductResponse> {
    return this.httpClient.patch<IPurchaseProductResponse>(
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
