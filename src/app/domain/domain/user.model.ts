export interface IUser {
  id?: string;
  name: string;
  lastName: string;
}

export interface RegisterUserData {
  id?: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  branchId: string;
}
