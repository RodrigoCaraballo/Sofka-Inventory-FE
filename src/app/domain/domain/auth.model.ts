export interface AuthData {
  email: string;
  password: string;
}

export interface JWTModel {
  userId: string;
  userRole: string;
  branchId: string;
  exp: number;
}

export interface AuthReponse {
  token: string;
}
