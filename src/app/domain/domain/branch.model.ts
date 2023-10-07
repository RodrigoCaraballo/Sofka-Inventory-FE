import { IProductDomainEntity } from './product.model';

export interface IBranchDomainEntity {
  id?: string;
  name?: string;
  country?: string;
  city?: string;
  location?: string;
  products: IProductDomainEntity[];
}

export interface IRegisterBranchRequest {
  name: string;
  country: string;
  city: string;
}

export interface IRegisterBranchResponse {
  id: string;
  name: string;
  country: string;
  city: string;
}
