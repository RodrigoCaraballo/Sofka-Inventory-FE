import { InjectionToken } from '@angular/core';
import { IProductApiService } from '../services/interfaces/product.api.service.interface';

export const HTTP_PRODUCT_SERVICE = new InjectionToken<IProductApiService>(
  'ProductApiService'
);
