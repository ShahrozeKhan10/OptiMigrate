import Api from './Axios';
import { getConfig } from '.';

const Stripe = {
  payment: async (token: any, userData: any) => {
    const endpoint = 'http://localhost:8000/payment';
    return await Api.post(endpoint, { userData }, getConfig(token));
  },
  getPayment: async (token: any, userId: any) => {
    const endpoint = 'http://localhost:8000/payment/get_user_payment';
    return await Api.post(endpoint, { userId }, getConfig(token));
  },
};

export default Stripe;
