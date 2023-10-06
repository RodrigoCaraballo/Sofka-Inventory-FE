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
    this.socket = io('ws://localhost:3004');
  }
  listenToEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  emitConfirmationEvent(data: any) {
    // Puedes personalizar el nombre del evento de confirmación
    this.socket.emit('confirmacion_evento', data);
  }
}
