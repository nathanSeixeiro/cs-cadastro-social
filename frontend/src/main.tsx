import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Aside from "./components/internals/aside/aside";
import AssistList from "./pages/Assists/AssistList";
import AssistRegister from "./pages/Assists/AssistRegister";
import Notify from "./pages/Notifys/Notify";
import Advices from "./pages/Advices/Advices";
import AdvicesRegister from "./pages/Advices/AdvicesRegister"; "./pages/Advices/Advices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/assist-list",
    element: <AssistList />,
  },
  {
    path: "/assist-register",
    element: <AssistRegister />,
  },
  {
    path: "/notify",
    element: <Notify />,
  },
  {
    path: "/advices",
    element: <Advices />,
  },
  {
    path: "/advices-register",
    element: <AdvicesRegister />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Aside />
    <RouterProvider router={router} />
  </StrictMode>
);
