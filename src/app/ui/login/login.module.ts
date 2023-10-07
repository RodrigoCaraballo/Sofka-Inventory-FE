import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from 'src/app/domain/infrastructure/services/implementation/auth.api.service';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { HTTP_AUTH_SERVICE } from 'src/app/domain/infrastructure/providers/auth.api.provider';
import { AuthUseCase } from 'src/app/domain/application/auth.use-case';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
  providers: [
    AuthUseCase,
    {
      provide: HTTP_AUTH_SERVICE,
      useClass: AuthApiService,
    },
  ],
})
export class LoginModule {}
