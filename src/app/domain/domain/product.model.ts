export interface IProductSocketResponse {
  id?: string;
  name: string;
  description: string;
  price: number;
  inventoryStock?: number;
  category: string;
}

export interface IRegisterProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  branchId: string;
}

export type ProductInventoryData = {
  id: string;
  inventoryStock: number;
};

export interface IProductInventoryChangeSocketResponse {
  branchId: string;
  product: ProductInventoryData;
}

export interface IRegisterInventoryRequest {
  branchId: string;
  product: ProductInventoryData;
}

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  inventoryStock?: number;
  category?: string;
}
