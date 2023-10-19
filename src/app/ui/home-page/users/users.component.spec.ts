import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { of, throwError } from 'rxjs';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetBranchesUseCase } from 'src/app/domain/application/get-branches.use-case';
import { RegisterUserUseCase } from 'src/app/domain/application/register-user.use-case';
import {
  CommandResponse,
  IBranch,
  JWTModel,
  RegisterUserData,
} from 'src/app/domain/domain';
import { SocketApiService } from 'src/app/domain/infrastructure';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let getBranchesUseCase: GetBranchesUseCase;
  let getBranchUseCase: GetBranchUseCase;
  let registerUserUseCase: RegisterUserUseCase;
  let socketApiService: SocketApiService;
  let formBuilder: FormBuilder;
  let superAdminToken: string;
  let adminToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, NavBarComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: GetBranchUseCase,
          useValue: jasmine.createSpyObj('GetBranchUseCase', ['execute']),
        },
        {
          provide: GetBranchesUseCase,
          useValue: jasmine.createSpyObj('GetBranchesUseCase', ['execute']),
        },
        {
          provide: RegisterUserUseCase,
          useValue: jasmine.createSpyObj('RegisterUserUseCase', ['execute']),
        },
        {
          provide: SocketApiService,
          useValue: jasmine.createSpyObj('SocketApiService', ['listenToEvent']),
        },
        FormBuilder,
      ],
    }).compileComponents();

    getBranchesUseCase = TestBed.inject(GetBranchesUseCase);
    getBranchUseCase = TestBed.inject(GetBranchUseCase);
    registerUserUseCase = TestBed.inject(RegisterUserUseCase);
    formBuilder = TestBed.inject(FormBuilder);
    socketApiService = TestBed.inject(SocketApiService);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    superAdminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMzMzE4LCJleHAiOjE2OTc3NzY1MTh9.TQ8gFGF9-4f5qzlf-CSyCf02dKjuwvjBq0EB27U389U';
    adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMwMzE4LCJleHAiOjE2OTc3NzM1MTh9.oBp3HiUpMyRH_ljsR3xu-9fQhcL7vONftRxdTOj0s1o';

    fixture.detectChanges();
  });

  it('should create the component as super admin', () => {
    const value = {
      name: 'John',
      lastName: 'Doe',
    };

    spyOn(localStorage, 'getItem').and.returnValue(superAdminToken);

    const branch: IBranch = {
      id: '124',
      city: 'San Francisco',
      country: 'CA',
      products: [],
      employees: [],
      name: 'John',
    };

    const branches = [branch];

    (getBranchUseCase.execute as jasmine.Spy).and.returnValue(of(branch));
    (getBranchesUseCase.execute as jasmine.Spy).and.returnValue(of(branches));
    (socketApiService.listenToEvent as jasmine.Spy).and.returnValue(
      of(JSON.stringify(value))
    );
    expect(component).toBeTruthy();
  });

  it('should create the component as admin', () => {
    const value = {
      name: 'John',
      lastName: 'Doe',
    };

    spyOn(localStorage, 'getItem').and.returnValue(adminToken);

    const branch: IBranch = {
      id: '124',
      city: 'San Francisco',
      country: 'CA',
      products: [],
      employees: [],
      name: 'John',
    };

    const branches = [branch];

    (getBranchUseCase.execute as jasmine.Spy).and.returnValue(of(branch));
    (getBranchesUseCase.execute as jasmine.Spy).and.returnValue(of(branches));
    (socketApiService.listenToEvent as jasmine.Spy).and.returnValue(
      of(JSON.stringify(value))
    );
    expect(component).toBeTruthy();
  });

  it('should register a user successfully', () => {
    const registerUserData: RegisterUserData = {
      branchId: '1',
      email: 'test@example.com',
      lastName: 'test',
      name: 'test',
      password: 'Rodrigo1234',
      role: 'admim',
    };
    const response: CommandResponse = {
      statusCode: 200,
      success: true,
    };

    component.decodeUser = jwtDecode(adminToken) as JWTModel;
    component.registerUserForm.setValue(registerUserData);

    spyOn(localStorage, 'getItem').and.returnValue(adminToken);

    (registerUserUseCase.execute as jasmine.Spy).and.returnValue(of(response));

    component.registerUser();

    expect(registerUserUseCase.execute).toHaveBeenCalledWith(registerUserData);
    expect(component.successMessage).toEqual('User created successfully');
  });

  it('should display an error message on user registration error', () => {
    const registerUserData: RegisterUserData = {
      branchId: '1',
      email: 'test@example.com',
      lastName: 'test',
      name: 'test',
      password: 'Rodrigo1234',
      role: 'admim',
    };

    const errorResponse = new HttpErrorResponse({
      error: { message: 'Registration failed' },
    });

    component.decodeUser = jwtDecode(adminToken) as JWTModel;
    component.registerUserForm.setValue(registerUserData);

    spyOn(localStorage, 'getItem').and.returnValue(adminToken);

    (registerUserUseCase.execute as jasmine.Spy).and.returnValue(
      throwError(errorResponse)
    );

    component.registerUserForm.setValue(registerUserData);
    component.registerUser();

    expect(registerUserUseCase.execute).toHaveBeenCalledWith(registerUserData);
    expect(component.errorMessage).toEqual('Registration failed');
  });
});
