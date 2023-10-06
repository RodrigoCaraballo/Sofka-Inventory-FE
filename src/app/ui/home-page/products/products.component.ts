import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterProductInventoryStockUseCase } from 'src/app/domain/application/register-product-inventory-stock.use-case';
import { RegisterProductUseCase } from 'src/app/domain/application/register-product.use-case';
import {
  IBranch,
  IProduct,
  IProductInventoryChangeSocketResponse,
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
    const parsedToken: JWTModel = JSON.parse(token);

    this.loadBranch();
    this.socketService
      .listenToEvent(`new_product_${parsedToken.branchId}`)
      .subscribe((data) => {
        const newProduct = JSON.parse(data) as IProduct;

        if (!this.products) return;

        this.products = [newProduct, ...this.products];
      });
    this.socketService
      .listenToEvent(`new_inventory_${parsedToken.branchId}`)
      .subscribe((data) => {
        const newProduct = JSON.parse(
          data
        ) as IProductInventoryChangeSocketResponse;

        if (!this.products) return;

        const updatedProducts = this.products.map((product) => {
          if (product.id === newProduct.product.id && product.inventoryStock)
            return {
              ...product,
              inventoryStock:
                product.inventoryStock + newProduct.product.inventoryStock,
            };

          return product;
        });

        this.products = updatedProducts;
      });
  }

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

  registerProduct() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const parsedToken: JWTModel = JSON.parse(token);

    this.registerProductForm.patchValue({ branchId: parsedToken.branchId });

    if (!this.registerProductForm.valid) return;

    this.registerProductUseCase
      .execute(
        this.registerProductForm.value as unknown as IRegisterProductRequest
      )
      .subscribe({
        next: (response: CommandResponse) => {
          console.log(response);
          this.registerProductForm.reset();
        },
      });
  }

  addInventoryStock() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const parsedToken: JWTModel = JSON.parse(token);

    if (
      !this.registerInventoryStockForm.valid ||
      !this.registerInventoryStockForm.value.id ||
      !this.registerInventoryStockForm.value.inventoryStock
    )
      return;

    const formData: IRegisterInventoryRequest = {
      branchId: parsedToken.branchId,
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
    });
  }
}
