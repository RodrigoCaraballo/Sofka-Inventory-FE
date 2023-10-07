import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'branch',
    loadChildren: () =>
      import('./ui/branch/branch.module').then((m) => m.BranchModule),
  },
  {
    path: 'register-user',
    loadChildren: () =>
      import('./ui/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./ui/product/product.module').then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
