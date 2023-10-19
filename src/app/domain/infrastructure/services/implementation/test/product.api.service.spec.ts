import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductApiService } from '../product.api.service';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApiService],
    });

    service = TestBed.inject(ProductApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to the register customer sale endpoint', () => {
    const registerSale = {
      branchId: '123',
      invoiceNumber: '123',
      products: [
        {
          id: '123',
          inventoryStock: 2,
        },
      ],
    };

    const expectedResponse = {
      statusCode: 200,
      success: true,
    };

    service.registerFinalCustomerSale(registerSale).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/product/customer-sale`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  it('should make an HTTP POST request to the register reseller sale endpoint', () => {
    const registerSale = {
      branchId: '123',
      invoiceNumber: '123',
      products: [
        {
          id: '123',
          inventoryStock: 2,
        },
      ],
    };

    const expectedResponse = {
      statusCode: 200,
      success: true,
    };

    service.registerResellerSale(registerSale).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/product/reseller-sale`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  it('should make an HTTP POST request to the register product endpoint', () => {
    const registerProduct = {
      name: 'foo',
      description: 'bar',
      price: 2,
      category: 'others',
      branchId: '123',
    };

    const expectedResponse = {
      statusCode: 200,
      success: true,
    };

    service.registerProduct(registerProduct).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/product/register`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  it('should make an HTTP POST request to the register purchase endpoint', () => {
    const registerStock = [
      {
        branchId: '123',
        product: {
          id: '123',
          inventoryStock: 2,
        },
      },
    ];

    const expectedResponse = {
      statusCode: 200,
      success: true,
    };

    service.registerInventoryStock(registerStock).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/product/purchase`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  it('should make an HTTP POST request to the register return sale endpoint', () => {
    const registerStock = {
      branchId: '123',
      saleId: '123',
      productId: '123',
      invoiceNumber: '1234',
      inventoryStock: 2,
    };

    const expectedResponse = {
      statusCode: 200,
      success: true,
    };

    service.registerReturnSale(registerStock).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/product/return-sale`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
