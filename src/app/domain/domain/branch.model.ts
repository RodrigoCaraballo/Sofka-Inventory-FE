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
