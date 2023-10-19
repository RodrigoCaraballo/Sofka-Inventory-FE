import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RegisterUserData } from 'src/app/domain/domain';
import { UserApiService } from '../user.api.service';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService],
    });

    service = TestBed.inject(UserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to the endpoint', () => {
    const eventName: RegisterUserData = {
      branchId: '1234',
      email: 'test@example.com',
      lastName: 'test',
      name: 'test',
      password: 'test',
      role: 'admin',
    };

    service.registerUser(eventName).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const expectedResponse = {
      statusCode: 200,
      success: true,
    };

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/user/register`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
