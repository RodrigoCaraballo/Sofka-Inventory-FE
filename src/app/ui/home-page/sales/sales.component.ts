import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import jwt_decode from 'jwt-decode';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { GetSalesUseCase } from 'src/app/domain/application/get-sales.use-case';
import { RegisterResellerSaleUseCase } from 'src/app/domain/application/register-reseller-sale.use-case';
import { RegisterReturnSaleUseCase } from 'src/app/domain/application/register-return-sale.use-case';
import {
  CommandResponse,
  IBranch,
  IProduct,
  IRegisterSaleRequest,
  ISale,
  ISaleSocketResponse,
  ProductInventoryData,
  RegisterReturnSaleData,
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
  filteredSales: ISale[] = [];
  filterSelected: string = '';
  decodeUser?: JWTModel;
  newSales: ProductInventoryData[] = [];
  errorMessage?: string;

  @ViewChild('salesDiv', { static: false }) salesDiv!: ElementRef;

  constructor(
    private readonly getBranchUseCase: GetBranchUseCase,
    private formBuilder: FormBuilder,
    private readonly getSalesUseCase: GetSalesUseCase,
    private readonly registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RegisterResellerSaleUseCase,
    private readonly socketService: SocketApiService,
    private readonly registerReturnSaleUseCase: RegisterReturnSaleUseCase
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

        if (this.filterSelected === 'final customer') {
          const finalCustomerSales = newSales.filter(
            (sale) => sale.type?.toLocaleLowerCase() !== 'final customer'
          );

          this.filteredSales = [...finalCustomerSales, ...this.filteredSales];
          return;
        } else if (this.filterSelected === 'reseller') {
          const finalCustomerSales = newSales.filter(
            (sale) => sale.type?.toLocaleLowerCase() !== 'reseller'
          );

          this.filteredSales = [...finalCustomerSales, ...this.filteredSales];
          return;
        } else {
          this.filteredSales = [...newSales, ...this.filteredSales];
        }
      });

    this.socketService
      .listenToEvent(`return_sale_${parsedToken.branchId}`)
      .subscribe((data) => {
        const returnSale = JSON.parse(data) as RegisterReturnSaleData;

        if (!this.products) return;

        const newSales = this.sales.filter((s) => s.id !== returnSale.saleId);
        this.sales = newSales;

        if (this.filterSelected === 'final customer') {
          const finalCustomerSales = this.filteredSales.filter(
            (s) => s.id !== returnSale.saleId
          );

          this.filteredSales = finalCustomerSales;
          return;
        } else if (this.filterSelected === 'reseller') {
          const resellerSales = this.filteredSales.filter(
            (s) => s.id !== returnSale.saleId
          );

          this.filteredSales = resellerSales;
          return;
        } else {
          const sales = this.filteredSales.filter(
            (s) => s.id !== returnSale.saleId
          );
          this.filteredSales = sales;
        }
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
        this.filteredSales = sales;
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

  filterSales(event: Event) {
    const selectValue = (event.target as HTMLSelectElement).value;
    this.filterSelected = selectValue.toLocaleLowerCase();

    if (selectValue === '') {
      this.filteredSales = this.sales;
      return;
    }

    const productsFiltered = this.sales.filter(
      (sale) =>
        sale.type?.toLocaleLowerCase() === selectValue.toLocaleLowerCase()
    );
    this.filteredSales = productsFiltered;
  }

  generateAllSalePDF() {
    const doc = new jsPDF();

    doc.text('Lista de Ventas', 10, 10);

    const columns = [
      'Invoice Number',
      'Name',
      'Price',
      'Quantity',
      'Total',
      'Type',
    ];

    let sales = this.sales;
    if (this.filterSelected !== '') {
      sales = this.sales.filter(
        (s) =>
          s.type.toLocaleUpperCase() === this.filterSelected.toLocaleUpperCase()
      );
    }

    const data = sales.map((sale, index) => [
      sale.invoiceNumber,
      sale.productName,
      sale.productPrice,
      sale.quantity?.toString(),
      (sale.quantity || 1) * (sale.productPrice || 1),
      sale.type,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('sales_list.pdf');
  }

  exportTotalSalesPDF() {
    const doc = new jsPDF();

    doc.text('Lista de Ventas', 10, 10);

    const columns = ['Product Name', 'Total Units', 'Total $'];

    let totalResume: {
      productName: string;
      totalQuantity: number;
      totalPrice: number;
    }[] = [];
    this.sales.forEach((sale) => {
      const { productName, productPrice, quantity } = sale;

      const saleTotal = totalResume.find(
        (totalSale) => totalSale.productName === productName
      );

      if (!saleTotal) {
        const newTotalSale = {
          productName,
          totalPrice: parseFloat(productPrice.toString()),
          totalQuantity: quantity,
        };
        totalResume = [...totalResume, newTotalSale];
      } else {
        const newTotal = totalResume.map((totalSale) => {
          if (totalSale.productName === productName) {
            totalSale.totalQuantity += quantity;
            totalSale.totalPrice += parseFloat(productPrice.toString());
            return totalSale;
          }

          return totalSale;
        });

        totalResume = newTotal;
      }
    });

    const data = totalResume.map((sale, index) => [
      sale.productName,
      sale.totalQuantity,
      `$ ${sale.totalPrice}`,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    console.log('After');

    doc.save('total_sales.pdf');
  }

  registerReturnSale(sale: ISale) {
    const product = this.products.find((p) => p.name === sale.productName);
    console.log(product);

    if (!product?.id || !sale?.invoiceNumber || !sale?.id || !sale.quantity) {
      console.log('Product not found');

      return;
    }
    const data: RegisterReturnSaleData = {
      branchId: this.decodeUser!.branchId,
      productId: product.id,
      invoiceNumber: sale.invoiceNumber,
      saleId: sale.id,
      inventoryStock: sale.quantity,
    };

    this.registerReturnSaleUseCase.execute(data).subscribe({
      next: () => {
        console.log('OK');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
