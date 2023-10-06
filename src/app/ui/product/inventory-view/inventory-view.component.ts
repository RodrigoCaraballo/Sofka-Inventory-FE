import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import {
  GetAllProductsUseCase,
  RegisterProductUseCase,
} from 'src/app/domain/application';
import { IProductDomainEntity, TypeNameEnum } from 'src/app/domain/domain';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css'],
})
export class InventoryViewComponent implements OnInit, OnDestroy {
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
  branchSelected: string = '22aa8bc9-1e54-4142-8331-09b870da1fa0';
  products: IProductDomainEntity[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly socketService: Socket,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly registerProductUseCase: RegisterProductUseCase
  ) {}
  ngOnDestroy(): void {
    this.socketService.emit('inventory.leave', this.branchSelected);
  }
  ngOnInit(): void {
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
}
