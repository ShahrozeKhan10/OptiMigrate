export interface ISignup {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  token: string;
}
export interface IResetPassword {
  id: string;
  password: string;
}

export interface AuthError extends Error {
  error_code?: string;
}
