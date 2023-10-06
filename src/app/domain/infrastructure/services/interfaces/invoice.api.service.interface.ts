import { Observable } from 'rxjs';
import { IInvoiceDomainEntity } from 'src/app/domain/domain';

export interface IInvoiceApiService {
  getAllInvoices(
    invoiceId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IInvoiceDomainEntity[]>;
}
