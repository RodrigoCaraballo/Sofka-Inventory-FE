import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BranchApiService } from '../branch.api.service';

describe('BranchApiService', () => {
  let service: BranchApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BranchApiService],
    });

    service = TestBed.inject(BranchApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to the register endpoint', () => {
    const registerBranch = {
      name: 'branch',
      country: 'United States',
      city: 'United States',
    };

    const expectedResponse = {
      ...registerBranch,
      id: '123',
    };

    service.registerBranch(registerBranch).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/branch/register`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  it('should make an HTTP POST request to the get branch endpoint', () => {
    const branchId = '123';

    const expectedResponse = {
      name: 'branch',
      country: 'United States',
      city: 'United States',
      id: '123',
      products: [],
    };

    service.getBranch(branchId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/branch/branch/${branchId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedResponse);
  });

  it('should make an HTTP POST request to the get branches endpoint', () => {
    const expectedResponse = [
      {
        name: 'branch',
        country: 'United States',
        city: 'United States',
        id: '123',
        products: [],
      },
      {
        name: 'branch',
        country: 'United States',
        city: 'United States',
        id: '123',
        products: [],
      },
    ];

    service.getBranches().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/branch/branches`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
