import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";

// render - sample page
const HomePage = Loadable(lazy(() => import("pages/home-page/home-page")));
const GroupChat = Loadable(lazy(() => import("pages/group-chat/group-chat")));
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
          path: "home-page",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "group-chat",
          element: <GroupChat />,
          children: [
            {
              path: "info",
              element: <GroupChat />,
            },
          ],
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
