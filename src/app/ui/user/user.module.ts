import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserUseCase } from 'src/app/domain/application';
import {
  HTTP_BRANCH_SERVICE,
  HTTP_USER_SERVICE,
} from 'src/app/domain/infrastructure/providers';
import {
  BranchApiService,
  UserApiService,
} from 'src/app/domain/infrastructure/services';
import { GetAllBranchesUseCase } from 'src/app/domain/application/get-all-branches.use-case';
import { AuthUseCase } from 'src/app/domain/application/auth.use-case';
import { AuthApiService } from 'src/app/domain/infrastructure/services/implementation/auth.api.service';
import { HTTP_AUTH_SERVICE } from 'src/app/domain/infrastructure/providers/auth.api.provider';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
  providers: [
    RegisterUserUseCase,
    GetAllBranchesUseCase,
    AuthUseCase,
    {
      provide: HTTP_AUTH_SERVICE,
      useClass: AuthApiService,
    },
    {
      provide: HTTP_USER_SERVICE,
      useClass: UserApiService,
    },
    {
      provide: HTTP_BRANCH_SERVICE,
      useClass: BranchApiService,
    },
  ],
})
export class UserModule {}
