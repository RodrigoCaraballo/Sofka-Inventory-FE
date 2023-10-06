import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoiceDomainEntity } from 'src/app/domain/domain';
import { environment } from 'src/environments/environment';
import { IInvoiceApiService } from '../interfaces';

@Injectable()
export class InvoiceApiService implements IInvoiceApiService {
  private URL_QUERY = `${environment.apiQueries}/api/v1/invoice`;

  constructor(private readonly httpClient: HttpClient) {}
  getAllInvoices(
    branchId: string,
    pagination: { page: number; pageSize: number }
  ): Observable<IInvoiceDomainEntity[]> {
    return this.httpClient.get<IInvoiceDomainEntity[]>(
      `${this.URL_QUERY}/all/${branchId}?page=${pagination.page}&pageSize=${pagination.pageSize}`
    );
  }
}
