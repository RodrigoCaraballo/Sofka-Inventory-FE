import { of } from 'rxjs';
import { CommandResponse, IRegisterSaleRequest } from '../../domain';
import { IProductApiService } from '../../infrastructure/services/interfaces/product.api.service.interface';
import { RegisterResellerSaleUseCase } from '../register-reseller-sale.use-case';

describe('RegisterProductInventoryStockUseCase', () => {
  let useCase: RegisterResellerSaleUseCase;
  let service: IProductApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IProductApiService', [
      'registerResellerSale',
    ]);
    useCase = new RegisterResellerSaleUseCase(service);
  });

  it('should call service.registerResellerSale with the provided data and return the result', (done) => {
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

    (service.registerResellerSale as jasmine.Spy).and.returnValue(
      of(expectedResponse)
    );

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerResellerSale).toHaveBeenCalledWith(data);
      done();
    });
  });
});
