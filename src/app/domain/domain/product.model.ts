import { ProductCategoryEnum } from './enums';

export interface IProductDomainEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ProductCategoryEnum;
  branchId: string;
}

export interface IRegisterProductRequest {
  name: string;
  description: string;
  price: number;
  category: ProductCategoryEnum;
  branchId: string;
}

export interface IRegisterProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ProductCategoryEnum;
  branchId: string;
}

export interface IPurchaseProductRequest {
  id: string;
  quantity: number;
}

export interface IPurchaseProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ProductCategoryEnum;
  branchId: string;
}

export interface IAllProductsResponse {
  products: IProductDomainEntity[];
}

export interface IRegisterInventoryRequest {
  id: string;
  quantity: number;
}

export type ProductInventoryData = {
  productId: string;
  quantity: number;
};
