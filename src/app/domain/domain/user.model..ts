export interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  branchId: string;
}

export interface IRegisterUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  branchId: string;
}
