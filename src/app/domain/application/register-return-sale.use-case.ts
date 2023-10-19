import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponse, RegisterReturnSaleData } from '../domain';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers/product-api.provider';
import { IProductApiService } from '../infrastructure/services/interfaces/product.api.service.interface';

@Injectable({ providedIn: 'root' })
export class RegisterReturnSaleUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productApiService: IProductApiService
  ) {}

  execute(sale: RegisterReturnSaleData): Observable<CommandResponse> {
    return this.productApiService.registerReturnSale(sale);
  }
}
