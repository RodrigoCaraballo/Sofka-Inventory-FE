import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { ISocketApiService } from '../interfaces/';

@Injectable({
  providedIn: 'root',
})
export class SocketApiService implements ISocketApiService {
  socket: any;

  constructor() {
    this.socket = io(`ws://${window._env.SOCKET_API}`);
  }
  listenToEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }
}
