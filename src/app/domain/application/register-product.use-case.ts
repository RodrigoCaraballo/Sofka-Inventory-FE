import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterProductRequest, IRegisterProductResponse } from '../domain';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers';
import { IProductApiService } from '../infrastructure/services';

@Injectable({ providedIn: 'root' })
export class RegisterProductUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productApiService: IProductApiService
  ) {}

  execute(
    newProduct: IRegisterProductRequest
  ): Observable<IRegisterProductResponse> {
    return this.productApiService.registerProduct(newProduct);
  }
}
