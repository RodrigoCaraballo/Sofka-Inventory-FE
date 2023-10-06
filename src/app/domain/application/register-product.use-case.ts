import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterProductRequest } from '../domain';
import { CommandResponse } from '../domain/reponse.model';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers/product-api.provider';
import { IProductApiService } from '../infrastructure/services/interfaces/product.api.service.interface';

@Injectable({ providedIn: 'root' })
export class RegisterProductUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productService: IProductApiService
  ) {}

  execute(product: IRegisterProductRequest): Observable<CommandResponse> {
    return this.productService.registerProduct(product);
  }
}
