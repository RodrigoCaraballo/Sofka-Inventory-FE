import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthUseCase } from 'src/app/domain/application/auth.use-case';
import {
  AuthData,
  AuthResponse,
  JWTModel,
} from 'src/app/domain/domain/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  errorMessage?: string;

  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    console.log(token);
    const parsedToken: JWTModel = JSON.parse(token);
    console.log(parsedToken);
    this.router.navigateByUrl('/products');
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authUseCase.execute(this.loginForm.value as AuthData).subscribe({
      next: ({ token }) => {
        const tokenData: JWTModel = jwt_decode(token);
        localStorage.setItem('token', JSON.stringify(tokenData));
        this.router.navigateByUrl('/products');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.error?.message) {
          this.errorMessage = error.error?.message;

          setTimeout(() => {
            this.errorMessage = undefined;
          }, 2000);

          return;
        }

        this.errorMessage = 'Error trying to login';
        setTimeout(() => {
          this.errorMessage = undefined;
        }, 2000);
      },
    });
  }
}
