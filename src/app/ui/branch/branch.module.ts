import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BranchRoutingModule } from './branch.routing.module';
import { RegisterBranchFormComponent } from './register-branch-form/register-branch-form.component';

@NgModule({
  declarations: [RegisterBranchFormComponent],
  imports: [CommonModule, BranchRoutingModule],
  exports: [RegisterBranchFormComponent],
})
export class BranchModule {}
