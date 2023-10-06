import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_INVOICE_SERVICE } from '../infrastructure/providers';
import { InvoiceApiService } from '../infrastructure/services';
import { IInvoiceDomainEntity } from '../domain';

@Injectable({ providedIn: 'root' })
export class GetAllInvoicesUseCase {
  constructor(
    @Inject(HTTP_INVOICE_SERVICE)
    private readonly invoiceApiService: InvoiceApiService
  ) {}

  execute(
    invoiceId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IInvoiceDomainEntity[]> {
    return this.invoiceApiService.getAllInvoices(invoiceId, pagination);
  }
}
