import React from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./Route";
const App = () => {
  const router = createRouter();
  return <RouterProvider router={router} />;
};

export default App;
