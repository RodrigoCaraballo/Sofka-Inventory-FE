import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { RegisterProductComponent } from './register-product/register-product.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import {
  GetAllInvoicesUseCase,
  GetAllProductsUseCase,
  RegisterProductUseCase,
} from 'src/app/domain/application';
import {
  InvoiceApiService,
  ProductApiService,
} from 'src/app/domain/infrastructure/services/implementation';
import {
  HTTP_INVOICE_SERVICE,
  HTTP_PRODUCT_SERVICE,
} from 'src/app/domain/infrastructure/providers';

@NgModule({
  declarations: [
    RegisterProductComponent,
    InventoryViewComponent,
    InvoiceViewComponent,
  ],
  imports: [CommonModule, ProductRoutingModule],
  providers: [
    RegisterProductUseCase,
    GetAllProductsUseCase,
    GetAllInvoicesUseCase,
    {
      provide: HTTP_PRODUCT_SERVICE,
      useClass: ProductApiService,
    },
    {
      provide: HTTP_INVOICE_SERVICE,
      useClass: InvoiceApiService,
    },
  ],
  exports: [
    RegisterProductComponent,
    InventoryViewComponent,
    InvoiceViewComponent,
  ],
})
export class ProductModule {}
