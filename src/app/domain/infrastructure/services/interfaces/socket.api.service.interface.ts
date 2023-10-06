import { Observable } from 'rxjs';

export interface ISocketApiService {
  listenToEvent(eventName: string): Observable<any>;
}
