import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IBranch,
  IProduct,
  IProductInventoryChangeSocketResponse,
  ISale,
  IUser,
} from 'src/app/domain/domain';

@Injectable()
export class AppStateService {
  private branchState = new BehaviorSubject<IBranch>({
    id: undefined,
    city: undefined,
    country: undefined,
    name: undefined,
  });
  private productsState = new BehaviorSubject<IProduct[]>([]);
  private salesState = new BehaviorSubject<ISale[]>([]);
  private usersState = new BehaviorSubject<IUser[]>([]);

  currentBranch = this.branchState.asObservable();
  currentProducts = this.productsState.asObservable();
  currentSales = this.salesState.asObservable();
  currentUsers = this.usersState.asObservable();

  constructor() {}

  setBranch(branch: IBranch): void {
    this.branchState.next(branch);
  }

  addProduct(product: IProduct): void {
    this.currentProducts.subscribe({
      next: (products) => {
        const updatedProducts = [product, ...products];
        this.productsState.next(updatedProducts);
      },
    });
  }

  updateProductStockIn(product: IProductInventoryChangeSocketResponse): void {
    this.currentProducts.subscribe({
      next: (products) => {
        const updatedProducts = products.map((stateProduct) => {
          if (
            stateProduct.id === product.product.id &&
            stateProduct.inventoryStock
          )
            return {
              ...stateProduct,
              inventoryStock:
                stateProduct.inventoryStock + product.product.inventoryStock,
            };
          return stateProduct;
        });
        this.productsState.next(updatedProducts);
      },
    });
  }
}
