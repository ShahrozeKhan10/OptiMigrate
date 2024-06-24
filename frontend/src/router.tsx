import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants/routes';

import useAuth from './hooks/useAuth';
// Public Routes
const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Layout = lazy(() => import('./components/Layout'));
const Email = lazy(() => import('./pages/Email'));
const VerifyEmail = lazy(() => import('./pages/Verify'));
const TheStory = lazy(() => import('./pages/TheStory'));
const TheNeed = lazy(() => import('./pages/TheNeed'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// Private Routes
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const Assessment = lazy(() => import('./pages/Assessment'));
const Resume = lazy(() => import('./pages/Resume'));
const Thankyou = lazy(() => import('./pages/Thankyou'));
const Payment = lazy(() => import('./pages/Payment'));
const Plan = lazy(() => import('./pages/Plan'));
const Countries = lazy(() => import('./pages/Countries'));
const CountryDetails = lazy(() => import('./pages/CountryDetails'));

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
};

const MainRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.ASSESSMENT} element={<Assessment />} />
            <Route path={ROUTES.RESUME} element={<Resume />} />
            <Route path={ROUTES.THANK_YOU} element={<Thankyou />} />
            <Route path={ROUTES.PLAN} element={<Plan />} />
            <Route path={ROUTES.PAYMENT} element={<Payment />} />
          </Route>

          <Route index element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          <Route path={ROUTES.EMAIL} element={<Email />} />
          <Route path={ROUTES.VERIFY} element={<VerifyEmail />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.STORY} element={<TheStory />} />
          <Route path={ROUTES.NEED} element={<TheNeed />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.COUNTRIES} element={<Countries />} />
          <Route path={ROUTES.COUNTRY_DETAILS} element={<CountryDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
