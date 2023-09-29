import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBranchFormComponent } from './register-branch-form/register-branch-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Fast Inventory - Register Branch',
        component: RegisterBranchFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BranchRoutingModule {}
