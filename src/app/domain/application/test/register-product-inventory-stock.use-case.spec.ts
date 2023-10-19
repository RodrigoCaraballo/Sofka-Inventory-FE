import { of } from 'rxjs';
import { CommandResponse, IRegisterInventoryRequest } from '../../domain';
import { IProductApiService } from '../../infrastructure/services/interfaces/product.api.service.interface';
import { RegisterProductInventoryStockUseCase } from '../register-product-inventory-stock.use-case';

describe('RegisterProductInventoryStockUseCase', () => {
  let useCase: RegisterProductInventoryStockUseCase;
  let service: IProductApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IProductApiService', [
      'registerInventoryStock',
    ]);
    useCase = new RegisterProductInventoryStockUseCase(service);
  });

  it('should call service.registerInventoryStock with the provided data and return the result', (done) => {
    const data: IRegisterInventoryRequest[] = [
      {
        branchId: 'test',
        product: {
          id: '12',
          inventoryStock: 1,
        },
      },
    ];

    const expectedResponse: CommandResponse = {
      statusCode: 200,
      success: true,
    };

    (service.registerInventoryStock as jasmine.Spy).and.returnValue(
      of(expectedResponse)
    );

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerInventoryStock).toHaveBeenCalledWith(data);
      done();
    });
  });
});
