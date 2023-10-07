import { Observable } from 'rxjs';
import { ISale } from 'src/app/domain/domain/sales.model';

export interface ISaleApiService {
  getSales(saleId: string): Observable<ISale[]>;
}
