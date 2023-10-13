import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedCanActivate } from 'src/app/domain/infrastructure/guards/is-logged.guard';
import { isSuperAdminOrAdmin } from 'src/app/domain/infrastructure/guards/super-admin-or-admin.guard';
import { isSuperAdmin } from 'src/app/domain/infrastructure/guards/super-admin.guard';
import { isUserAdmin } from 'src/app/domain/infrastructure/guards/user.guard';
import { BranchComponent } from './branch/branch.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        title: 'Products',
        component: ProductsComponent,
        canActivate: [isLoggedCanActivate, isUserAdmin],
      },
      {
        path: 'sales',
        title: 'Sales',
        component: SalesComponent,
        canActivate: [isLoggedCanActivate, isUserAdmin],
      },
      {
        path: 'users',
        title: 'Users',
        component: UsersComponent,
        canActivate: [isLoggedCanActivate, isSuperAdminOrAdmin],
      },
      {
        path: 'branches',
        title: 'Branches',
        component: BranchComponent,
        canActivate: [isLoggedCanActivate, isSuperAdmin],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
