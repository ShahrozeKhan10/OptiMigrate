import Api from './Axios';
import { getConfig } from '.';

const Payment = {
  paymentHistory: async (token: any, userData: any) => {
    const endpoint = 'http://localhost:8000/payment/user_payment';
    return await Api.post(endpoint, { userData }, getConfig(token));
  },
};

export default Payment;
