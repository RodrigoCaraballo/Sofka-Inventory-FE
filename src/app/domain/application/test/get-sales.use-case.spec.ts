import { of } from 'rxjs';
import { ISale } from '../../domain';
import { ISaleApiService } from '../../infrastructure/services/interfaces/sale.api.service.interface';
import { GetSalesUseCase } from '../get-sales.use-case';

describe('GetSalesUseCase', () => {
  let useCase: GetSalesUseCase;
  let service: ISaleApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('ISaleApiService', ['getSales']);
    useCase = new GetSalesUseCase(service);
  });

  it('should call service.getSales with the provided data and return the result', (done) => {
    const branchId = '1234';

    const expectedResponse: ISale[] = [
      {
        id: '1234',
        invoiceNumber: '1234',
        productName: 'Product',
        productPrice: 2,
        quantity: 1,
        type: 'Money',
      },
    ];

    (service.getSales as jasmine.Spy).and.returnValue(of(expectedResponse));

    useCase.execute(branchId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.getSales).toHaveBeenCalledWith(branchId);
      done();
    });
  });
});
