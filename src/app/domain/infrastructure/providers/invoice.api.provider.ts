import { InjectionToken } from '@angular/core';
import { IInvoiceApiService } from '../services/interfaces';

export const HTTP_INVOICE_SERVICE = new InjectionToken<IInvoiceApiService>(
  'InvoiceApiService'
);
