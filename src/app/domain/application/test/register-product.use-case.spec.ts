import { of } from 'rxjs';
import { CommandResponse, IRegisterProductRequest } from '../../domain';
import { IProductApiService } from '../../infrastructure/services/interfaces/product.api.service.interface';
import { RegisterProductUseCase } from '../register-product.use-case';

describe('RegisterProductUseCase', () => {
  let useCase: RegisterProductUseCase;
  let service: IProductApiService;

  beforeEach(() => {
    service = jasmine.createSpyObj('IProductApiService', ['registerProduct']);
    useCase = new RegisterProductUseCase(service);
  });

  it('should call service.registerProduct with the provided data and return the result', (done) => {
    const data: IRegisterProductRequest = {
      branchId: '1234',
      category: 'Product',
      description: 'Product',
      name: 'Product',
      price: 100,
    };

    const expectedResponse: CommandResponse = {
      statusCode: 200,
      success: true,
    };

    (service.registerProduct as jasmine.Spy).and.returnValue(
      of(expectedResponse)
    );

    useCase.execute(data).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(service.registerProduct).toHaveBeenCalledWith(data);
      done();
    });
  });
});
