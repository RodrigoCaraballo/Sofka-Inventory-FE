import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthUseCase } from 'src/app/domain/application/auth.use-case';
import {
  AuthData,
  AuthReponse,
  JWTModel,
} from 'src/app/domain/domain/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  errorMessage?: string;

  constructor(
    private authUseCase: AuthUseCase,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  login(): void {
    if (!this.loginForm.valid) return;

    this.authUseCase.execute(this.loginForm.value as AuthData).subscribe({
      next: (token: AuthReponse) => {
        const tokenData: JWTModel = jwt_decode(token.token);
        localStorage.setItem('token', JSON.stringify(tokenData));
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        if (error?.message) {
          this.errorMessage = error.message;

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
