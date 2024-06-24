import * as React from 'react';
// import { useNavigation } from 'react-router-dom';

// import { ROUTES } from 'src/constants/routes';

import { LOCAL_USER, USER_PAYMENT } from 'src/constants/Auth';

interface UserPayment {
  payment_id: string;
  payment_status: string;
}

export interface AuthContextType {
  id: string;
  name: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
  userPayment: UserPayment;
  logout: () => void;
  resetUserDetails: () => void;
  setUserDetails: (data: any) => void;
}

const DEFAULT_USER_PAYMENT: UserPayment = {
  payment_id: '',
  payment_status: '',
};

const DEFAULT_USER_DETAILS = {
  id: '',
  name: '',
  email: '',
  token: '',
};

// Set defaults for reuse
const DEFAULTS = {
  isLoggedIn: false,
  ...DEFAULT_USER_DETAILS,
  userPayment: DEFAULT_USER_PAYMENT,
  logout: () => {},
  resetUserDetails: () => {},
  setUserDetails: (data: any) => {},
};

const AuthContext = React.createContext<AuthContextType>(DEFAULTS);

const AuthProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  //   const navigate = useNavigation();
  const [logged, setLogged] = React.useState(DEFAULTS.isLoggedIn);
  const [user, setUser] = React.useState(DEFAULT_USER_DETAILS);
  const [userPayment, setUserPayment] = React.useState(DEFAULTS?.userPayment);

  const resetUserDetails = () => setUserDetails(DEFAULT_USER_DETAILS);

  const setUserDetails: AuthContextType['setUserDetails'] = (data: any) => {
    if (data?.id) {
      setUser((prevData: object) => ({ ...prevData, ...data }));
      setLogged(true);
      localStorage.setItem(LOCAL_USER, JSON.stringify(data));
    }
  };

  React.useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_USER);
    if (storedData !== null) {
      const userData = JSON.parse(storedData);
      setUserDetails({
        email: userData.email,
        name: userData.name,
        id: userData.id,
        token: userData.token,
      });
      // TODO: Fetch and populate user_payment details using below method
      const paymentData = localStorage.getItem(USER_PAYMENT);
      if (paymentData !== null) {
        const payment = JSON.parse(paymentData);
        setUserPayment({
          payment_id: payment?.payment_id,
          payment_status: payment?.payment_status,
        });
      }
      setLogged(true);
    } else {
      setUserDetails(DEFAULT_USER_DETAILS);
      setLogged(false);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    localStorage.removeItem(LOCAL_USER);
    setUserDetails(DEFAULT_USER_DETAILS);
    setLogged(false);
  };

  const contextValues = {
    ...user,
    isLoggedIn: logged,
    userPayment,
    setUserDetails,
    resetUserDetails,
    logout,
  };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
