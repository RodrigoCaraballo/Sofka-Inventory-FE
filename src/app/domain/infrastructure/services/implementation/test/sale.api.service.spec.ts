import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ISale } from 'src/app/domain/domain';
import { SaleApiService } from '../sale.api.service';

describe('SaleApiService', () => {
  let service: SaleApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SaleApiService],
    });

    service = TestBed.inject(SaleApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to the get endpoint', () => {
    const saleId = '123';

    const expectedResponse: ISale[] = [
      {
        invoiceNumber: '123',
        productName: 'Product Name',
        productPrice: 2,
        quantity: 1,
        type: 'RESELLER',
      },
    ];

    service.getSales(saleId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/branch/sales/${saleId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
