import { IProduct } from './product.model';

export interface IRegisterBranchRequest {
  name: string;
  country: string;
  city: string;
}

export interface IBranch {
  id?: string;
  name?: string;
  country?: string;
  city?: string;
  products: IProduct[];
}

export interface IRegisterBranchResponse {
  id: string;
  name: string;
  country: string;
  city: string;
}
