import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthUseCase } from 'src/app/domain/application/auth.use-case';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let useCase: AuthUseCase;
  let router: Router;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthUseCase,
          useValue: jasmine.createSpyObj('AuthUseCase', ['execute']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    useCase = TestBed.inject(AuthUseCase);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home/branches for super admin after successful login', () => {
    const superAdminToken = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMwMzE4LCJleHAiOjE2OTc3NzM1MTh9.oBp3HiUpMyRH_ljsR3xu-9fQhcL7vONftRxdTOj0s1o',
    };

    (useCase.execute as jasmine.Spy).and.returnValue(of(superAdminToken));

    component.loginForm.setValue({
      email: 'admin@admin.com',
      password: 'admin',
    });

    component.login();

    expect(useCase.execute).toHaveBeenCalledWith({
      email: 'admin@admin.com',
      password: 'admin',
    });

    expect(router.navigateByUrl).toHaveBeenCalledWith('/home/branches');
  });

  it('should navigate to /home/products after successful login', () => {
    const adminToken = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI2ZTE5YWNjMzE3NGI3MWQ0ZTIiLCJ1c2VyRW1haWwiOiJtYXRlb0BtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJicmFuY2hJZCI6IjZiZWViMzZkLTE2ZjItNGI3OC1iYzQzLTNhZjQ5YjU3MmQ3MiIsImlhdCI6MTY5NzcxNTgzNSwiZXhwIjoxNjk3NzU5MDM1fQ.qvpeyMTNnONYL6-r5olK6wayBh6kW1EcOJ7u6fUvKXI',
    };

    (useCase.execute as jasmine.Spy).and.returnValue(of(adminToken));

    component.loginForm.setValue({
      email: 'mateo@mail.com',
      password: 'Rodrigo1234',
    });

    component.login();

    expect(useCase.execute).toHaveBeenCalledWith({
      email: 'mateo@mail.com',
      password: 'Rodrigo1234',
    });

    expect(router.navigateByUrl).toHaveBeenCalledWith('/home/products');
  });

  it('should display an error message on login error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Login failed' },
    });

    (useCase.execute as jasmine.Spy).and.returnValue(throwError(errorResponse));

    component.loginForm.setValue({
      email: 'error@example.com',
      password: 'errorpassword',
    });

    component.login();

    expect(useCase.execute).toHaveBeenCalledWith({
      email: 'error@example.com',
      password: 'errorpassword',
    });

    expect(component.errorMessage).toBe('Login failed');
  });
});
