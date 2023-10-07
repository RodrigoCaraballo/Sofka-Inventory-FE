import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import {
  GetAllProductsUseCase,
  RegisterProductUseCase,
} from 'src/app/domain/application';
import { GetBranchUseCase } from 'src/app/domain/application/get-branch.use-case';
import { RegisterProductInventoryStockUseCase } from 'src/app/domain/application/register-product-inventory-stock.use-case';
import {
  IBranchDomainEntity,
  IProductDomainEntity,
  IRegisterInventoryRequest,
  IRegisterProductRequest,
  JWTModel,
  TypeNameEnum,
} from 'src/app/domain/domain';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css'],
})
export class InventoryViewComponent implements OnInit, OnDestroy {
  addStockOn: boolean = false;
  errorMessage?: string;

  registerProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    branchId: ['', Validators.required],
  });

  registerInventoryStockForm = this.formBuilder.group({
    id: ['', Validators.required],
    inventoryStock: ['', Validators.required],
  });
  branchSelected: string = '';
  products: IProductDomainEntity[] = [];
  constructor(
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly formBuilder: FormBuilder,
    private readonly socketService: Socket,
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly registerProductInventoryUseCase: RegisterProductInventoryStockUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase
  ) {}
  ngOnDestroy(): void {
    this.socketService.emit('inventory.leave', this.branchSelected);
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    console.log(token);
    const parsedToken: JWTModel = JSON.parse(token);
    console.log(parsedToken);
    this.branchSelected = parsedToken.branchId;
    this.loadBranch();

    this.getAllProductsUseCase
      .execute(this.branchSelected, {
        page: 1,
        pageSize: 10,
      })
      .subscribe({
        next: (response) => {
          this.products = response;
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.socketService.emit('inventory.join', this.branchSelected);

    this.socketService
      .fromEvent(TypeNameEnum.PRODUCT_REGISTERED)
      .subscribe((data) => {
        this.products.push(data as IProductDomainEntity);
        console.log(data);
      });

    this.socketService
      .fromEvent(TypeNameEnum.PRODUCT_PURCHASE_REGISTERED)
      .subscribe((data) => {
        const productPurchased = data as IProductDomainEntity;
        const productIndex = this.products.findIndex(
          (product) => product.id === productPurchased.id
        );
        if (productIndex !== -1) {
          this.products[productIndex] = productPurchased;
        }
      });

    this.socketService
      .fromEvent(TypeNameEnum.PRODUCT_UPDATED)
      .subscribe((data) => {
        const productUpdated = data as IProductDomainEntity;
        const productIndex = this.products.findIndex(
          (product) => product.id === productUpdated.id
        );
        if (productIndex !== -1) {
          this.products[productIndex] = productUpdated;
        }
      });
  }

  loadBranch() {
    this.getBranchUseCase.execute(this.branchSelected).subscribe({
      next: (branch: IBranchDomainEntity) => {
        console.log(branch);
        this.products = branch.products;
      },
      error: (error) => {
        console.log('ee', error);
      },
    });
  }

  registerProduct() {
    this.registerProductForm.patchValue({ branchId: this.branchSelected });
    if (!this.registerProductForm.valid) {
      this.registerProductForm.markAllAsTouched();
      return;
    }
    this.registerProductUseCase
      .execute(
        this.registerProductForm.value as unknown as IRegisterProductRequest
      )
      .subscribe({
        next: (response: CommandResponse) => {
          this.registerProductForm.reset();
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

  addInventoryStock() {
    if (
      !this.registerInventoryStockForm.valid ||
      !this.registerInventoryStockForm.value.id ||
      !this.registerInventoryStockForm.value.inventoryStock
    ) {
      this.registerInventoryStockForm.markAllAsTouched();
      return;
    }
    const formData: IRegisterInventoryRequest = {
      id: this.registerInventoryStockForm.value.id,
      quantity: parseInt(this.registerInventoryStockForm.value.inventoryStock),
    };
    this.registerProductInventoryUseCase.execute(formData).subscribe({
      next: (response: CommandResponse) => {
        console.log(response);
        this.registerInventoryStockForm.reset();
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

        this.errorMessage = 'Error trying to add stock to product';

        setTimeout(() => {
          this.errorMessage = undefined;
        }, 2000);
      },
    });
  }
}
