import { IProduct } from './product.model';
import { IUser } from './user.model';

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
  employees?: IUser[];
}

export interface IRegisterBranchResponse {
  id: string;
  name: string;
  country: string;
  city: string;
}
