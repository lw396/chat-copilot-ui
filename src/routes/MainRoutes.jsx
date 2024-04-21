import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";

// render - sample page
const SamplePage = Loadable(
  lazy(() => import("pages/extra-pages/sample-page"))
);
const Tables = Loadable(lazy(() => import("pages/tables/Tables")));
const PaginationTable = Loadable(
  lazy(() => import("pages/tables/PaginationTable"))
);
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "sample-page",
          element: <SamplePage />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "tables",
          element: <Tables />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "paginationTable",
          element: <PaginationTable />,
        },
      ],
    },
  ],
};

export default MainRoutes;
