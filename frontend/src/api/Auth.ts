import { ILogin, IResetPassword, ISignup } from 'src/@types';

import Api from './Axios';
import Stripe from './Stripe';

const Auth = {
  signUp: async (data: ISignup) => {
    const endpoint = `http://localhost:8000/register`;
    return await Api.post(endpoint, data);
  },

  signIn: async (data: ILogin) => {
    const endpoint = `http://localhost:8000/login`;
    try {
      const response = await Api.post(endpoint, data);
      await Stripe.getPayment(response.data.data.token, response.data.data.id)
        .then((data: any) => {
          if (data?.data?.data) {
            return localStorage.setItem('user-payment', JSON.stringify(data.data.data));
          }
          localStorage.setItem(
            'user-payment',
            JSON.stringify({
              payment_id: '',
              payment_status: 'not paid',
            }),
          );
        })
        .catch(e => console.error(e));
      if (response.data.data.role !== 'user') {
        const res = {
          response: {
            data: {
              error_code: 'invalid_user_type',
            },
          },
        };
        throw res;
      }

      return response;
    } catch (e) {}
    return;
  },

  forgotPassword: async (email: string) => {
    const endpoint = `http://localhost:8000/forgot-password`;
    try {
      return await Api.post(endpoint, {
        email,
      });
    } catch (e) {}
    return;
  },

  resetPassword: async ({ id, password }: IResetPassword) => {
    const endpoint = `http://localhost:8000/reset-password`;

    try {
      return await Api.put(endpoint, {
        id,
        password,
      });
    } catch (e) {}
    return;
  },

  validateRequest: async (token: string) => {
    const endpoint = `http://localhost:8000/validate-request`;

    try {
      return await Api.post(endpoint, {
        token,
      });
    } catch (e) {}
    return;
  },

  validateEmail: async (token: string) => {
    const endpoint = `http://localhost:8000/validate-email`;

    try {
      return await Api.post(endpoint, {
        token,
      });
    } catch (e) {}
    return;
  },

  subscribeWaitList: async (email: string) => {
    const endpoint = `http://localhost:8000/newsletter/subscribe`;

    try {
      return await Api.post(endpoint, {
        email,
      });
    } catch (e) {}
    return;
  },

  // unSubscribeWaitList: async (email: string) => {
  //   // /api/v1/newsletter/subscribe
  //   const endpoint = `/newsletter/subscribe`;

  //   try {
  //     return await Api.delete(endpoint, {
  //       email,
  //     });
  //   } catch (e) {}
  //   return;
  // },
};

export default Auth;
