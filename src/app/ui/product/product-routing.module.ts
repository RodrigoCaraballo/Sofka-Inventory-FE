import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProductComponent } from './register-product/register-product.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Fast Inventory - Register Branch',
        component: InventoryViewComponent,
      },
      {
        path: 'invoices',
        title: 'Fast Invoices',
        component: InvoiceViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
