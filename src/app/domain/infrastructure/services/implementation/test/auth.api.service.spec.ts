import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthApiService } from '../auth.api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });

    service = TestBed.inject(AuthApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to the authentication endpoint', () => {
    const authData = {
      email: 'test@example.com',
      password: 'password',
    };

    const expectedResponse = {
      token: 'token',
    };

    service.auth(authData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/auth`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
