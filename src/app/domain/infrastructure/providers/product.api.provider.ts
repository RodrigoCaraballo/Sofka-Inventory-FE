import { InjectionToken } from '@angular/core';
import { IProductApiService } from '../services/interfaces';

export const HTTP_PRODUCT_SERVICE = new InjectionToken<IProductApiService>(
  'ProductApiService'
);
