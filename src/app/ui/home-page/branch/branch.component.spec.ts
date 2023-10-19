import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RegisterBranchUseCase } from 'src/app/domain/application/register-branch.use-case';
import { SocketApiService } from 'src/app/domain/infrastructure';
import { IRegisterBranchRequest } from '../../../domain/domain/branch.model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BranchComponent } from './branch.component';

describe('BranchComponent', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;
  let registerBranchUseCase: RegisterBranchUseCase;
  let socketApiService: SocketApiService;
  let superAdminToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchComponent, NavBarComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: RegisterBranchUseCase,
          useValue: jasmine.createSpyObj('RegisterUserUseCase', ['execute']),
        },
        {
          provide: SocketApiService,
          useValue: jasmine.createSpyObj('ISocketApiService', [
            'listenToEvent',
          ]),
        },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;
    registerBranchUseCase = TestBed.inject(RegisterBranchUseCase);
    socketApiService = TestBed.inject(SocketApiService);

    superAdminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMzMzE4LCJleHAiOjE2OTc3NzY1MTh9.TQ8gFGF9-4f5qzlf-CSyCf02dKjuwvjBq0EB27U389U';
    fixture.detectChanges();
  });

  it('should create the component as super admin', () => {
    const value = {
      name: 'John',
      lastName: 'Doe',
    };

    spyOn(localStorage, 'getItem').and.returnValue(superAdminToken);
    expect(component).toBeTruthy();
  });

  it('should fill the states attribute', () => {
    const event = {
      target: {
        value: 'Uruguay',
      },
    };

    component.getCities(event as unknown as Event);
    expect(component.states.length).toBeGreaterThan(0);
  });

  const response = {
    statusCode: 200,
    success: true,
  };

  it('should register a branch and show a message', () => {
    const branch: IRegisterBranchRequest = {
      name: 'test',
      city: 'test',
      country: 'test',
    };

    component.branchForm.setValue(branch);

    (registerBranchUseCase.execute as jasmine.Spy).and.returnValue(
      of(response)
    );

    component.registerBranch();
    expect(component.states.length).toBeGreaterThan(0);
  });
});
