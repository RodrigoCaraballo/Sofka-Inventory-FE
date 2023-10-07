import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterProductRequest, IRegisterProductResponse } from '../domain';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers';
import { IProductApiService } from '../infrastructure/services';
import { CommandResponse } from '../domain/reponse.model';

@Injectable({ providedIn: 'root' })
export class RegisterProductUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productApiService: IProductApiService
  ) {}

  execute(newProduct: IRegisterProductRequest): Observable<CommandResponse> {
    return this.productApiService.registerProduct(newProduct);
  }
}
