import { ProductInventoryData } from './product.model';

export interface ISaleSocketResponse {
  id?: string;
  branchId: string;
  invoiceNumber: string;
  type?: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface ISale {
  id?: string;
  invoiceNumber?: string;
  type?: string;
  productName?: string;
  productPrice?: number;
  quantity?: number;
}

export interface IRegisterSaleRequest {
  branchId: string;
  userId: string;
  products: ProductInventoryData[];
  discount?: number;
}
