export interface AuthData {
  email: string;
  password: string;
}

export interface JWTModel {
  userId: string;
  userRole: string;
  branchId: string;
}

export interface AuthReponse {
  token: string;
}