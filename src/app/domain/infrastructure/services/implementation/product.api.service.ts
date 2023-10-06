import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRegisterProductRequest,
  IRegisterProductResponse,
} from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IProductApiService } from '../interfaces';

@Injectable()
export class ProductApiService implements IProductApiService {
  private URL_PRODUCT = environment.api + '/api/v1/product';

  constructor(private readonly httpClient: HttpClient) {}

  registerProduct(
    newProduct: IRegisterProductRequest
  ): Observable<IRegisterProductResponse> {
    return this.httpClient.post<IRegisterProductResponse>(
      `${this.URL_PRODUCT}/register`,
      newProduct
    );
  }
}
