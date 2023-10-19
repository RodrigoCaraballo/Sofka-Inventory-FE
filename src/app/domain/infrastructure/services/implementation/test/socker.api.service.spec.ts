import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SocketApiService } from '../socket.api.service';

describe('SocketApiService', () => {
  let service: SocketApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SocketApiService],
    });

    service = TestBed.inject(SocketApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an WS request to the endpoint', () => {
    const eventName = 'hello';

    service.listenToEvent(eventName).subscribe((response) => {
      expect(response).toEqual(jasmine.any(Observable));
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
