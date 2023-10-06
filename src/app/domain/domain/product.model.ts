import { ProductCategoryEnum } from './enums';

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
