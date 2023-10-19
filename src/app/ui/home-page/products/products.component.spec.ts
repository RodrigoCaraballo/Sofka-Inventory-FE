import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetSalesUseCase } from 'src/app/domain/application/get-sales.use-case';
import { RegisterProductInventoryStockUseCase } from 'src/app/domain/application/register-product-inventory-stock.use-case';
import { RegisterProductUseCase } from 'src/app/domain/application/register-product.use-case';
import { IBranch } from 'src/app/domain/domain';
import { SocketApiService } from 'src/app/domain/infrastructure';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let getBranchUseCase: GetBranchUseCase;
  let getSalesUseCase: GetSalesUseCase;
  let registerProductUseCase: RegisterProductUseCase;
  let registerProductInventoryStockUseCase: RegisterProductInventoryStockUseCase;
  let socketApiService: SocketApiService;
  let superAdminToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, NavBarComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: GetBranchUseCase,
          useValue: jasmine.createSpyObj('GetBranchUseCase', ['execute']),
        },
        {
          provide: GetSalesUseCase,
          useValue: jasmine.createSpyObj('GetSalesUseCase', ['execute']),
        },
        {
          provide: RegisterProductUseCase,
          useValue: jasmine.createSpyObj('RegisterProductUseCase', ['execute']),
        },
        {
          provide: RegisterProductInventoryStockUseCase,
          useValue: jasmine.createSpyObj(
            'RegisterProductInventoryStockUseCase',
            ['execute']
          ),
        },
        {
          provide: SocketApiService,
          useValue: jasmine.createSpyObj('SocketApiService', ['listenToEvent']),
        },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    getBranchUseCase = TestBed.inject(GetBranchUseCase);
    getSalesUseCase = TestBed.inject(GetSalesUseCase);
    registerProductUseCase = TestBed.inject(RegisterProductUseCase);
    registerProductInventoryStockUseCase = TestBed.inject(
      RegisterProductInventoryStockUseCase
    );
    socketApiService = TestBed.inject(SocketApiService);

    superAdminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMzMzE4LCJleHAiOjE2OTc3NzY1MTh9.TQ8gFGF9-4f5qzlf-CSyCf02dKjuwvjBq0EB27U389U';
    fixture.detectChanges();
  });

  it('should create', () => {
    const branch: IBranch = {
      id: '1',
      city: 'San Francisco',
      country: 'CA',
      products: [],
      employees: [],
      name: 'John',
    };

    spyOn(localStorage, 'getItem').and.returnValue(superAdminToken);

    (getBranchUseCase.execute as jasmine.Spy).and.returnValue(of(branch));

    expect(component).toBeTruthy();
  });
});
