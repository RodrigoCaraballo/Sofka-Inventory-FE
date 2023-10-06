import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    const parsedToken: JWTModel = JSON.parse(token);

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
    inventoryStock: ['', Validators.required],
  });

  registerSaleForm = this.formBuilder.group({
    invoiceNumber: ['', Validators.required],
    type: ['', Validators.required],
  });

  loadBranch() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const parsedToken: JWTModel = JSON.parse(token);
    this.getBranchUseCase.execute(parsedToken.branchId).subscribe({
      next: (branch: IBranch) => {
        this.products = branch.products;
      },
    });
  }

  loadSales() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const parsedToken: JWTModel = JSON.parse(token);
    this.getSalesUseCase.execute(parsedToken.branchId).subscribe({
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
    if (!this.addProductForm.valid) return;

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
    const token = localStorage.getItem('token');
    if (!token) return;

    const parsedToken: JWTModel = JSON.parse(token);

    if (!this.registerSaleForm.value.invoiceNumber) return;

    const request: IRegisterSaleRequest = {
      branchId: parsedToken.branchId,
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
        console.log(response);
      },
    });
  }

  registerFinalCustomerSale(request: IRegisterSaleRequest) {
    this.registerFinalCustomerSaleUseCase.execute(request).subscribe({
      next: (response: CommandResponse) => {
        console.log(response);
      },
    });
  }
}
