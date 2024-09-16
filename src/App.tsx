import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/User/Signin";
// import Signup from "./Pages/User/Signup"; // Assuming you have a Signup component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Signin />,
  },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
