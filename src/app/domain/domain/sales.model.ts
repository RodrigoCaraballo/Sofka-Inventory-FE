import { ProductInventoryData } from './product.model';

export interface ISaleSocketResponse {
  id?: string;
  branchId: string;
  invoiceNumber: string;
  type: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface ISale {
  id?: string;
  invoiceNumber: string;
  type: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface IRegisterSaleRequest {
  branchId: string;
  invoiceNumber: string;
  products: ProductInventoryData[];
}

export interface RegisterReturnSaleData {
  branchId: string;
  saleId: string;
  productId: string;
  invoiceNumber: string;
  inventoryStock: number;
}
