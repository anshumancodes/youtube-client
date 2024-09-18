import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/User/Signin";
import SignUp from "./Pages/User/SignUp";
import { useAuth } from "./context/AuthContextProvider";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

function App() {
  const {user}=useAuth();
  console.log(user)
  return <RouterProvider router={router} />;
}

export default App;
