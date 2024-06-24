import AssessmentType from './Assessment';
import Auth from './Auth';
import Chats from './Chat';
import Country from './Country';
import Dashboard from './Dashboard';
import Profession from './Profession';
import Stripe from './Stripe';
import User from './User';
import UserPayment from './UserPayment';

export const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { AssessmentType, Auth, Chats, Country, Dashboard, Profession, Stripe, User, UserPayment };
