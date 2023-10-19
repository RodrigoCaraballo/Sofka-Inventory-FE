import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetSalesUseCase } from 'src/app/domain/application/get-sales.use-case';
import { RegisterFinalCustomerSaleUseCase } from 'src/app/domain/application/register-final-customer-sale.use.case';
import { RegisterResellerSaleUseCase } from 'src/app/domain/application/register-reseller-sale.use-case';
import { RegisterReturnSaleUseCase } from 'src/app/domain/application/register-return-sale.use-case';
import { IBranch } from 'src/app/domain/domain';
import { SocketApiService } from 'src/app/domain/infrastructure';
import { ISale } from '../../../domain/domain/sales.model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SalesComponent } from './sales.component';

describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;
  let getBranchUseCase: GetBranchUseCase;
  let getSalesUseCase: GetSalesUseCase;
  let registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase;
  let registerResellerSaleUseCase: RegisterResellerSaleUseCase;
  let registerReturnSaleUseCase: RegisterReturnSaleUseCase;
  let socketApiService: SocketApiService;
  let superAdminToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesComponent, NavBarComponent],
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
          provide: RegisterFinalCustomerSaleUseCase,
          useValue: jasmine.createSpyObj('RegisterFinalCustomerSaleUseCase', [
            'execute',
          ]),
        },
        {
          provide: RegisterResellerSaleUseCase,
          useValue: jasmine.createSpyObj('RegisterResellerSaleUseCase', [
            'execute',
          ]),
        },
        {
          provide: RegisterReturnSaleUseCase,
          useValue: jasmine.createSpyObj('RegisterReturnSaleUseCase', [
            'execute',
          ]),
        },
        {
          provide: SocketApiService,
          useValue: jasmine.createSpyObj('SocketApiService', ['listenToEvent']),
        },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(SalesComponent);
    component = fixture.componentInstance;
    getBranchUseCase = TestBed.inject(GetBranchUseCase);
    getSalesUseCase = TestBed.inject(GetSalesUseCase);
    registerFinalCustomerSaleUseCase = TestBed.inject(
      RegisterFinalCustomerSaleUseCase
    );
    registerResellerSaleUseCase = TestBed.inject(RegisterResellerSaleUseCase);
    registerReturnSaleUseCase = TestBed.inject(RegisterReturnSaleUseCase);
    socketApiService = TestBed.inject(SocketApiService);

    superAdminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMzMzE4LCJleHAiOjE2OTc3NzY1MTh9.TQ8gFGF9-4f5qzlf-CSyCf02dKjuwvjBq0EB27U389U';
    fixture.detectChanges();
  });

  it('should create', () => {
    const branch: IBranch = {
      id: '124',
      city: 'San Francisco',
      country: 'CA',
      products: [],
      employees: [],
      name: 'John',
    };

    const sales: ISale[] = [];

    spyOn(localStorage, 'getItem').and.returnValue(superAdminToken);
    (getBranchUseCase.execute as jasmine.Spy).and.returnValue(of(branch));
    (getSalesUseCase.execute as jasmine.Spy).and.returnValue(of(sales));

    expect(component).toBeTruthy();
  });
});
