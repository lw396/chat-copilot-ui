import { lazy } from "react";

// project import
import AuthLayout from "layout/Auth";
import Loadable from "components/Loadable";

// render - login
const AuthLogin = Loadable(lazy(() => import("pages/auth/login")));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <AuthLogin />,
        },
        {
          path: "login",
          element: <AuthLogin />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
