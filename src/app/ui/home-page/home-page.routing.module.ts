import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        title: 'Products',
        component: ProductsComponent,
      },
      {
        path: 'sales',
        title: 'Sales',
        component: SalesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
