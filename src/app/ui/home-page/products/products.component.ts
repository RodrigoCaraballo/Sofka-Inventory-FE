import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { RegisterProductInventoryStockUseCase } from 'src/app/domain/application/register-product-inventory-stock.use-case';
import { RegisterProductUseCase } from 'src/app/domain/application/register-product.use-case';
import {
  IBranch,
  IProduct,
  IRegisterInventoryRequest,
  IRegisterProductRequest,
} from 'src/app/domain/domain';
import { JWTModel } from 'src/app/domain/domain/auth.model';
import { CommandResponse } from 'src/app/domain/domain/reponse.model';
import { SocketApiService } from 'src/app/domain/infrastructure';
import { GetBranchUseCase } from '../../../domain/application/get-branch.use-case';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products?: IProduct[];
  addStockOn: boolean = false;
  errorMessage?: string;
  decodeUser?: JWTModel;

  registerProductForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(256)],
    ],
    price: ['', [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    branchId: ['', Validators.required],
  });

  registerInventoryStockForm = this.formBuilder.group({
    id: ['', Validators.required],
    inventoryStock: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly formBuilder: FormBuilder,
    private readonly socketService: SocketApiService,
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly registerProductInventoryUseCase: RegisterProductInventoryStockUseCase
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    const parsedToken: JWTModel = jwt_decode(token);
    this.decodeUser = parsedToken;

    this.loadBranch();
    this.socketService
      .listenToEvent(`new_product_${parsedToken.branchId}`)
      .subscribe((data) => {
        const newProduct = JSON.parse(data) as IProduct;

        if (!this.products) return;

        this.products = [newProduct, ...this.products];
      });
    this.socketService
      .listenToEvent(`product_update_${parsedToken.branchId}`)
      .subscribe((data) => {
        const newProduct = JSON.parse(data) as IProduct;

        if (!this.products) return;

        const updatedProducts = this.products.map((product) => {
          if (product.id === newProduct.id)
            return {
              ...product,
              inventoryStock: newProduct.inventoryStock,
            };

          return product;
        });

        this.products = updatedProducts;
      });
  }

  loadBranch() {
    if (!this.decodeUser) return;
    this.getBranchUseCase.execute(this.decodeUser.branchId).subscribe({
      next: (branch: IBranch) => {
        this.products = branch.products;
      },
    });
  }

  registerProduct() {
    if (!this.decodeUser) return;

    this.registerProductForm.patchValue({ branchId: this.decodeUser.branchId });

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
    if (!this.decodeUser) return;

    if (
      !this.registerInventoryStockForm.valid ||
      !this.registerInventoryStockForm.value.id ||
      !this.registerInventoryStockForm.value.inventoryStock
    ) {
      this.registerInventoryStockForm.markAllAsTouched();
      return;
    }

    const formData: IRegisterInventoryRequest = {
      branchId: this.decodeUser.branchId,
      product: {
        id: this.registerInventoryStockForm.value.id,
        inventoryStock: parseInt(
          this.registerInventoryStockForm.value.inventoryStock
        ),
      },
    };

    this.registerProductInventoryUseCase.execute(formData).subscribe({
      next: (response: CommandResponse) => {
        this.registerInventoryStockForm.reset();
      },
      error: (response: HttpErrorResponse) => {
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
