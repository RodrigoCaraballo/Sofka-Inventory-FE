import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetBranchesUseCase } from 'src/app/domain/application/get-branches.use-case';
import { RegisterUserUseCase } from 'src/app/domain/application/register-user.use-case';
import {
  CommandResponse,
  IBranch,
  IUser,
  JWTModel,
  RegisterUserData,
} from 'src/app/domain/domain';
import { SocketApiService } from 'src/app/domain/infrastructure';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  decodeUser?: JWTModel;
  errorMessage?: string;
  successMessage?: string;
  users?: IUser[];
  branches?: IBranch[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly getBranchesUseCase: GetBranchesUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly socketService: SocketApiService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    const parsedToken: JWTModel = jwt_decode(token);
    this.decodeUser = parsedToken;

    if (this.decodeUser.userRole === 'super admin') {
      this.loadBranches();
    } else if (this.decodeUser.userRole === 'admin') {
      this.loadBranch();
    }
    this.socketService
      .listenToEvent(`user_registered_${parsedToken.branchId}`)
      .subscribe((data) => {
        const newUser = JSON.parse(data) as IUser;

        if (!this.users) return;

        this.users = [newUser, ...this.users];
      });
  }

  registerUserForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\n\r]+$`),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    branchId: ['', Validators.required],
  });

  loadBranch() {
    if (!this.decodeUser) return;
    this.getBranchUseCase.execute(this.decodeUser.branchId).subscribe({
      next: (branch: IBranch) => {
        if (branch.employees) {
          this.users = branch.employees;
        }
      },
    });
  }

  loadBranches() {
    if (!this.decodeUser) return;
    this.getBranchesUseCase.execute().subscribe({
      next: (branches: IBranch[]) => {
        if (branches) {
          this.branches = branches;
        }
      },
    });
  }

  registerUser(): void {
    if (!this.decodeUser) return;

    if (this.registerUserForm.value.branchId === '') {
      this.registerUserForm.patchValue({
        branchId: this.decodeUser.branchId,
      });
    }

    if (!this.registerUserForm.valid) {
      this.registerUserForm.markAllAsTouched();

      return;
    }

    this.registerUserUseCase
      .execute(this.registerUserForm.value as RegisterUserData)
      .subscribe({
        next: (response: CommandResponse) => {
          this.registerUserForm.reset();
          this.successMessage = 'User created successfully';

          setTimeout(() => {
            this.successMessage = undefined;
          }, 2000);
        },
        error: (response: HttpErrorResponse) => {
          if (response.error?.message) {
            this.errorMessage = response.error.message;
            setTimeout(() => {
              this.errorMessage = undefined;
            }, 2000);

            return;
          }

          this.errorMessage = 'Error trying to add stock to product';

          setTimeout(() => {
            this.errorMessage = undefined;
          }, 2000);
        },
      });
  }
}
