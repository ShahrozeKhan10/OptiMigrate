export interface IUser {
  email: string;
  name: string;
  id: string;
  token: string;
}

export interface IUserPayment {
  payment_id: string;
  payment_status: string;
}
