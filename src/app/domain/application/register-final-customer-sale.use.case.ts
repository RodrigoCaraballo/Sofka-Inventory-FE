import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductApiService } from '../infrastructure/services/interfaces/product.api.service.interface';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers';
import { CommandResponse } from '../domain/reponse.model';
import { IRegisterSaleRequest } from '../domain/sales.model';

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
