import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { GetAllInvoicesUseCase } from 'src/app/domain/application';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { RegisterFinalCustomerSaleUseCase } from 'src/app/domain/application/register-final-customer-sale.use.case';
import { RegisterResellerSaleUseCase } from 'src/app/domain/application/register-reseller-sale.use-case';
import {
  IBranchDomainEntity,
  IInvoiceDomainEntity,
  IProductDomainEntity,
  JWTModel,
  ProductInventoryData,
  TypeNameEnum,
} from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';
import { IRegisterSaleRequest, ISale } from 'src/app/domain/domain/sales.model';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent {
  branchSelected: string = '';
  currentUser: string = '';
  products: IProductDomainEntity[] = [];
  invoices: IInvoiceDomainEntity[] = [];
  sales: ISale[] = [];
  errorMessage?: string;
  newSales: IProductDomainEntity[] = [];
  addProductForm = this.formBuilder.group({
    id: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
  });

  registerSaleForm = this.formBuilder.group({
    type: ['', Validators.required],
  });

  constructor(
    private readonly socketService: Socket,
    private readonly getAllInvoicesUseCase: GetAllInvoicesUseCase,
    private readonly getBranchUseCase: GetBranchUseCase,
    private formBuilder: FormBuilder,
    private readonly registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RegisterResellerSaleUseCase
  ) {}
  ngOnDestroy(): void {
    this.socketService.emit('invoice.leave', this.branchSelected);
  }
  ngOnInit(): void {
    this.loadBranch();
    this.loadSales();
    this.socketService.emit('invoice.join', this.branchSelected);
    this.socketService
      .fromEvent(TypeNameEnum.SELLER_SALE_REGISTERED)
      .subscribe((data) => {
        this.invoices.push(data as IInvoiceDomainEntity);
        console.log(data);
      });

    this.socketService
      .fromEvent(TypeNameEnum.CUSTOMER_SALE_REGISTERED)
      .subscribe((data) => {
        this.invoices.push(data as IInvoiceDomainEntity);
        console.log(data);
      });
  }

  loadBranch() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const parsedToken: JWTModel = JSON.parse(token);
    this.branchSelected = parsedToken.branchId;
    this.currentUser = parsedToken.userId;
    console.log(this.branchSelected);
    console.log(this.currentUser);
    this.getBranchUseCase.execute(this.branchSelected).subscribe({
      next: (branch: IBranchDomainEntity) => {
        this.products = branch.products;
      },
    });
  }

  loadSales() {
    this.getAllInvoicesUseCase
      .execute(this.branchSelected, {
        page: 1,
        pageSize: 10,
      })
      .subscribe({
        next: (response) => {
          this.invoices = response;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addOnNewSales() {
    if (!this.addProductForm.valid) {
      this.addProductForm.markAllAsTouched();
      return;
    }
    console.log(this.addProductForm.value.id);
    const updateSales = [
      ...this.newSales,
      this.addProductForm.value as unknown as IProductDomainEntity,
    ];
    this.newSales = updateSales;
    this.addProductForm.reset();
  }

  getProduct(productId: string): IProductDomainEntity | undefined {
    console.log(productId);
    return this.products.find((p) => p.id === productId);
  }

  registerSale() {
    if (!this.registerSaleForm.value.type) {
      this.registerSaleForm.markAllAsTouched();
      return;
    }
    const request: IRegisterSaleRequest = {
      userId: this.currentUser,
      branchId: this.branchSelected,
      products: this.newSales.map((p) => {
        return {
          productId: p.id,
          quantity: p.quantity,
        };
      }),
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
        this.registerSaleForm.reset();
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
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
        console.log(response);
        this.registerSaleForm.reset();
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
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
