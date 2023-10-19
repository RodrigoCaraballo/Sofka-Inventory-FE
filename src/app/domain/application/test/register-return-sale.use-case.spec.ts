import { of } from 'rxjs';
import { CommandResponse, RegisterReturnSaleData } from '../../domain';
import { IProductApiService } from '../../infrastructure/services/interfaces/product.api.service.interface';
import { RegisterReturnSaleUseCase } from '../register-return-sale.use-case';

describe('RegisterReturnSaleUseCase', () => {
  let useCase: RegisterReturnSaleUseCase;
  let service: IProductApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IProductApiService', [
      'registerReturnSale',
    ]);
    useCase = new RegisterReturnSaleUseCase(service);
  });

  it('should call service.registerReturnSale with the provided data and return the result', (done) => {
    const data: RegisterReturnSaleData = {
      branchId: '1234',
      inventoryStock: 2,
      invoiceNumber: '12',
      productId: '12',
      saleId: '12',
    };

    const expectedResponse: CommandResponse = {
      statusCode: 200,
      success: true,
    };

    (service.registerReturnSale as jasmine.Spy).and.returnValue(
      of(expectedResponse)
    );

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerReturnSale).toHaveBeenCalledWith(data);
      done();
    });
  });
});
