import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'branch',
    pathMatch: 'full',
  },
  {
    path: 'branch',
    loadChildren: () =>
      import('./ui/branch/branch.module').then((m) => m.BranchModule),
  },
  {
    path: 'user',
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
