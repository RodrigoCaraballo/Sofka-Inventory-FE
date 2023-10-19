import { of } from 'rxjs';
import { CommandResponse, IRegisterSaleRequest } from '../../domain';
import { IProductApiService } from '../../infrastructure/services/interfaces/product.api.service.interface';
import { RegisterFinalCustomerSaleUseCase } from '../register-final-customer-sale.use.case';

describe('RegisterFinalCustomerSaleUseCase', () => {
  let useCase: RegisterFinalCustomerSaleUseCase;
  let service: IProductApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IProductApiService', [
      'registerFinalCustomerSale',
    ]);
    useCase = new RegisterFinalCustomerSaleUseCase(service);
  });

  it('should call service.registerFinalCustomerSale with the provided data and return the result', (done) => {
    const data: IRegisterSaleRequest = {
      branchId: 'test',
      invoiceNumber: '123',
      products: [
        {
          id: '12',
          inventoryStock: 1,
        },
      ],
    };

    const expectedResponse: CommandResponse = {
      statusCode: 200,
      success: true,
    };

    (service.registerFinalCustomerSale as jasmine.Spy).and.returnValue(
      of(expectedResponse)
    );

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerFinalCustomerSale).toHaveBeenCalledWith(data);
      done();
    });
  });
});
