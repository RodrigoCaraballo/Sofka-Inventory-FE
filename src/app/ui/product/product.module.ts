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
  BranchApiService,
  InvoiceApiService,
  ProductApiService,
} from 'src/app/domain/infrastructure/services/implementation';
import {
  HTTP_BRANCH_SERVICE,
  HTTP_INVOICE_SERVICE,
  HTTP_PRODUCT_SERVICE,
} from 'src/app/domain/infrastructure/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { RegisterProductInventoryStockUseCase } from 'src/app/domain/application/register-product-inventory-stock.use-case';
import { RegisterFinalCustomerSaleUseCase } from 'src/app/domain/application/register-final-customer-sale.use.case';
import { GetSalesUseCase } from 'src/app/domain/application/get-sales.use-case';
import { RegisterResellerSaleUseCase } from 'src/app/domain/application/register-reseller-sale.use-case';
import { HTTP_SALE_SERVICE } from 'src/app/domain/infrastructure/providers/sale.api.provider';
import { SaleApiService } from 'src/app/domain/infrastructure/services/implementation/sale.api.service';

@NgModule({
  declarations: [
    RegisterProductComponent,
    InventoryViewComponent,
    InvoiceViewComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, ReactiveFormsModule],
  providers: [
    RegisterProductUseCase,
    GetAllProductsUseCase,
    GetAllInvoicesUseCase,
    GetBranchUseCase,
    RegisterProductUseCase,
    RegisterProductInventoryStockUseCase,
    GetSalesUseCase,
    RegisterFinalCustomerSaleUseCase,
    RegisterResellerSaleUseCase,
    {
      provide: HTTP_PRODUCT_SERVICE,
      useClass: ProductApiService,
    },
    {
      provide: HTTP_INVOICE_SERVICE,
      useClass: InvoiceApiService,
    },
    {
      provide: HTTP_BRANCH_SERVICE,
      useClass: BranchApiService,
    },
    {
      provide: HTTP_SALE_SERVICE,
      useClass: SaleApiService,
    },
  ],
  exports: [
    RegisterProductComponent,
    InventoryViewComponent,
    InvoiceViewComponent,
  ],
})
export class ProductModule {}
