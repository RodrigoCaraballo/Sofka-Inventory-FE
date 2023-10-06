import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetSalesUseCase } from 'src/app/domain/application/get-sales.use-case';
import { RegisterFinalCustomerSaleUseCase } from 'src/app/domain/application/register-final-customer-sale.use.case';
import { RegisterProductInventoryStockUseCase } from 'src/app/domain/application/register-product-inventory-stock.use-case';
import { RegisterProductUseCase } from 'src/app/domain/application/register-product.use-case';
import { RegisterResellerSaleUseCase } from 'src/app/domain/application/register-reseller-sale.use-case';
import {
  BranchApiService,
  HTTP_BRANCH_SERVICE,
} from 'src/app/domain/infrastructure';
import { HTTP_PRODUCT_SERVICE } from 'src/app/domain/infrastructure/providers/product-api.provider';
import { HTTP_SALE_SERVICE } from 'src/app/domain/infrastructure/providers/sale.api.provider';
import { ProductApiService } from 'src/app/domain/infrastructure/services/implementation/product.api.service';
import { SaleApiService } from 'src/app/domain/infrastructure/services/implementation/sale.api.service';
import { HomePageRoutingModule } from './home-page.routing.module';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [SalesComponent, ProductsComponent],
  imports: [CommonModule, HomePageRoutingModule, ReactiveFormsModule],
  providers: [
    GetBranchUseCase,
    RegisterProductUseCase,
    RegisterProductInventoryStockUseCase,
    GetSalesUseCase,
    RegisterFinalCustomerSaleUseCase,
    RegisterResellerSaleUseCase,
    {
      provide: HTTP_BRANCH_SERVICE,
      useClass: BranchApiService,
    },
    {
      provide: HTTP_PRODUCT_SERVICE,
      useClass: ProductApiService,
    },
    {
      provide: HTTP_SALE_SERVICE,
      useClass: SaleApiService,
    },
  ],
})
export class HomePageModule {}
