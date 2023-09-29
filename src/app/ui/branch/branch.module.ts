import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterBranchUseCase } from 'src/app/domain/application/register-branch.use-case';
import { BranchApiService } from 'src/app/domain/infrastructure/services/implementation/branch.api.service';
import { HTTP_BRANCH_SERVICE } from '../../domain/infrastructure/providers/branch.api.provider';
import { BranchRoutingModule } from './branch.routing.module';
import { RegisterBranchFormComponent } from './register-branch-form/register-branch-form.component';

@NgModule({
  declarations: [RegisterBranchFormComponent],
  imports: [CommonModule, BranchRoutingModule, ReactiveFormsModule],
  providers: [
    RegisterBranchUseCase,
    {
      provide: HTTP_BRANCH_SERVICE,
      useClass: BranchApiService,
    },
  ],
  exports: [RegisterBranchFormComponent],
})
export class BranchModule {}
