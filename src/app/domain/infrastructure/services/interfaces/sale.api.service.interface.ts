import { Observable } from 'rxjs';
import { ISale } from 'src/app/domain/domain';

export interface ISaleApiService {
  getSales(saleId: string): Observable<ISale[]>;
}
