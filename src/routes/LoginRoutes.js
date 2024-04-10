import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import AuthLayout from 'layout/AuthLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
