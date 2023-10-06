import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale } from '../domain';
import { HTTP_SALE_SERVICE } from '../infrastructure/providers/sale.api.provider';
import { ISaleApiService } from '../infrastructure/services/interfaces/sale.api.service.interface';

@Injectable({ providedIn: 'root' })
export class GetSalesUseCase {
  constructor(
    @Inject(HTTP_SALE_SERVICE)
    private readonly saleApiService: ISaleApiService
  ) {}

  execute(branchId: string): Observable<ISale[]> {
    return this.saleApiService.getSales(branchId);
  }
}
