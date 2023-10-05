import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { RegisterProductComponent } from './register-product/register-product.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

@NgModule({
  declarations: [RegisterProductComponent, InventoryViewComponent, InvoiceViewComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class ProductModule {}
