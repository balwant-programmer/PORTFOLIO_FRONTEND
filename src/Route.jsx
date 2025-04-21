import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";

import ProjectExplore from "./ProjectSection/ProjectExplore";
import Blog from "./Blog";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home/Home";
import MobileProfile from "./MobileProfile";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "profile",
          element: <MobileProfile />,
        },
        {
          path: "explore/:id",
          element: <ProjectExplore />,
        },
      ],
    },
  ]);
};
