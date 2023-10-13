import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale } from 'src/app/domain/domain';
import { ISaleApiService } from '../interfaces/sale.api.service.interface';

@Injectable()
export class SaleApiService implements ISaleApiService {
  private URL_SALES_QUERY = `http://${window._env.QUERY_API}/api/v1/branch`;

  constructor(private readonly httpClient: HttpClient) {}

  getSales(saleId: string): Observable<ISale[]> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<ISale[]>(
      `${this.URL_SALES_QUERY}/sales/${saleId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}
