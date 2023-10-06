import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers';
import { ProductApiService } from '../infrastructure/services';
import { IProductDomainEntity } from '../domain';

@Injectable({ providedIn: 'root' })
export class GetAllProductsUseCase {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE)
    private readonly productApiService: ProductApiService
  ) {}

  execute(
    productId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IProductDomainEntity[]> {
    return this.productApiService.getAllProducts(productId, pagination);
  }
}
