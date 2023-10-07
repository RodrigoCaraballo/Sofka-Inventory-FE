import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterUserUseCase } from '../../../domain/application/register-user.use-case.';
import { IBranchDomainEntity, JWTModel } from 'src/app/domain/domain';
import { GetAllBranchesUseCase } from 'src/app/domain/application/get-all-branches.use-case';
import { AuthUseCase } from 'src/app/domain/application/auth.use-case';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  branches: IBranchDomainEntity[] = [];
  registrationForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    branch: ['', [Validators.required]],
  });

  errorMessage?: string;

  constructor(
    private readonly getAllBranchesUseCase: GetAllBranchesUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly formBuilder: FormBuilder,
    private readonly authUseCase: AuthUseCase,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.getAllBranchesUseCase.execute().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (error) => {
        console.error('Error al obtener sucursales:', error);
      },
    });
  }

  registerUser(): void {
    if (this.registrationForm.valid) {
      const userRegistrationData = {
        firstName: this.registrationForm.get('firstName')?.value || '',
        lastName: this.registrationForm.get('lastName')?.value || '',
        email: this.registrationForm.get('email')?.value || '',
        password: this.registrationForm.get('password')?.value || '',
        role: 'employee',
        branchId:
          this.branches.find(
            (branch) =>
              branch.name === this.registrationForm.get('branch')?.value
          )?.id || '',
      };

      this.registerUserUseCase.execute(userRegistrationData).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente.', response);
          this.authUseCase
            .execute({
              email: userRegistrationData.email,
              password: userRegistrationData.password,
            })
            .subscribe({
              next: ({ token }) => {
                const tokenData: JWTModel = jwt_decode(token);
                localStorage.setItem('token', JSON.stringify(tokenData));
                this.router.navigateByUrl('/products');
              },
              error: (error) => {
                console.error('Error al autenticar usuario:', error);
                this.errorMessage = 'Error al autenticar usuario';
                setTimeout(() => {
                  this.errorMessage = undefined;
                }, 2000);
              },
            });
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          this.errorMessage = 'Error al registrar usuario';
          setTimeout(() => {
            this.errorMessage = undefined;
          }, 2000);
        },
      });
    }
  }
}
