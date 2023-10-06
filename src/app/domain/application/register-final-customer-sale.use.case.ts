import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponse, IRegisterSaleRequest } from '../domain';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers/product-api.provider';
import { IProductApiService } from '../infrastructure/services/interfaces/product.api.service.interface';

@Injectable({ providedIn: 'root' })
export class RegisterFinalCustomerSaleUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productService: IProductApiService
  ) {}

  execute(product: IRegisterSaleRequest): Observable<CommandResponse> {
    return this.productService.registerFinalCustomerSale(product);
  }
}
