import { InjectionToken } from '@angular/core';
import { ISaleApiService } from '../services/interfaces/sale.api.service.interface';

export const HTTP_SALE_SERVICE = new InjectionToken<ISaleApiService>(
  'SaleApiService'
);
