import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISaleApiService } from '../interfaces/sale.api.service.interface';
import { ISale } from 'src/app/domain/domain/sales.model';

@Injectable()
export class SaleApiService implements ISaleApiService {
  private URL_SALES_QUERY = environment.apiQueries + '/api/v1/branch';

  constructor(private readonly httpClient: HttpClient) {}

  getSales(saleId: string): Observable<ISale[]> {
    return this.httpClient.get<ISale[]>(
      `${this.URL_SALES_QUERY}/sales/${saleId}`
    );
  }
}
