import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetSalesUseCase } from 'src/app/domain/application/get-sales.use-case';
import { RegisterResellerSaleUseCase } from 'src/app/domain/application/register-reseller-sale.use-case';
import {
  CommandResponse,
  IBranch,
  IProduct,
  IRegisterSaleRequest,
  ISale,
  ISaleSocketResponse,
  ProductInventoryData,
} from 'src/app/domain/domain';
import { JWTModel } from 'src/app/domain/domain/auth.model';
import { SocketApiService } from 'src/app/domain/infrastructure';
import { RegisterFinalCustomerSaleUseCase } from '../../../domain/application/register-final-customer-sale.use.case';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  sales: ISale[] = [];
  products: IProduct[] = [];
  decodeUser?: JWTModel;

  errorMessage?: string;

  newSales: ProductInventoryData[] = [];

  constructor(
    private readonly getBranchUseCase: GetBranchUseCase,
    private formBuilder: FormBuilder,
    private readonly getSalesUseCase: GetSalesUseCase,
    private readonly registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RegisterResellerSaleUseCase,
    private readonly socketService: SocketApiService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    const parsedToken: JWTModel = jwt_decode(token);
    this.decodeUser = parsedToken;

    this.loadBranch();
    this.loadSales();
    this.socketService
      .listenToEvent(`new_sale_${parsedToken.branchId}`)
      .subscribe((data) => {
        const newSales = JSON.parse(data) as ISaleSocketResponse[];

        if (!this.products) return;

        this.sales = [...newSales, ...this.sales];
      });
  }

  addProductForm = this.formBuilder.group({
    id: ['', Validators.required],
    inventoryStock: ['', [Validators.required, Validators.min(1)]],
  });

  registerSaleForm = this.formBuilder.group({
    invoiceNumber: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    type: ['', Validators.required],
  });

  loadBranch() {
    if (!this.decodeUser) return;
    this.getBranchUseCase.execute(this.decodeUser.branchId).subscribe({
      next: (branch: IBranch) => {
        this.products = branch.products;
      },
    });
  }

  loadSales() {
    if (!this.decodeUser) return;
    this.getSalesUseCase.execute(this.decodeUser.branchId).subscribe({
      next: (sales: ISale[]) => {
        this.sales = sales;
      },
    });
  }

  getTotalSale(sale: ISale): number {
    if (!sale.productPrice || !sale.quantity) return 0;
    return sale.productPrice * sale.quantity;
  }

  addOnNewSales() {
    if (!this.addProductForm.valid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const updateSales = [
      ...this.newSales,
      this.addProductForm.value as unknown as ProductInventoryData,
    ];

    this.newSales = updateSales;
    this.addProductForm.reset();
  }

  getProduct(id: string): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  registerSale() {
    if (!this.decodeUser) return;

    if (
      !this.registerSaleForm.value.invoiceNumber ||
      !this.registerSaleForm.value.type
    ) {
      this.registerSaleForm.markAllAsTouched();
      return;
    }

    const request: IRegisterSaleRequest = {
      branchId: this.decodeUser.branchId,
      invoiceNumber: this.registerSaleForm.value.invoiceNumber,
      products: this.newSales,
    };

    if (this.registerSaleForm.value.type === 'Final Customer') {
      this.registerFinalCustomerSale(request);
    } else if (this.registerSaleForm.value.type === 'Reseller') {
      this.registerResellerSale(request);
    }
  }

  registerResellerSale(request: IRegisterSaleRequest) {
    this.registerResellerSaleUseCase.execute(request).subscribe({
      next: (response: CommandResponse) => {
        this.registerSaleForm.reset();
        this.newSales = [];
      },
      error: (response: HttpErrorResponse) => {
        if (response.error?.message) {
          this.errorMessage = response.error.message;
          setTimeout(() => {
            this.errorMessage = undefined;
          }, 2000);

          return;
        }

        this.errorMessage = 'Error trying to register a product';

        setTimeout(() => {
          this.errorMessage = undefined;
        }, 2000);
      },
    });
  }

  registerFinalCustomerSale(request: IRegisterSaleRequest) {
    this.registerFinalCustomerSaleUseCase.execute(request).subscribe({
      next: (response: CommandResponse) => {
        this.registerSaleForm.reset();
        this.newSales = [];
      },
      error: (response: HttpErrorResponse) => {
        if (response.error?.message) {
          this.errorMessage = response.error.message;
          setTimeout(() => {
            this.errorMessage = undefined;
          }, 2000);

          return;
        }

        this.errorMessage = 'Error trying to register a product';

        setTimeout(() => {
          this.errorMessage = undefined;
        }, 2000);
      },
    });
  }
}
