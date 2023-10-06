import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterInventoryRequest } from '../domain';
import { CommandResponse } from '../domain/reponse.model';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers/product-api.provider';
import { IProductApiService } from '../infrastructure/services/interfaces/product.api.service.interface';

@Injectable({ providedIn: 'root' })
export class RegisterProductInventoryStockUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productService: IProductApiService
  ) {}

  execute(product: IRegisterInventoryRequest): Observable<CommandResponse> {
    return this.productService.registerInventoryStock(product);
  }
}
