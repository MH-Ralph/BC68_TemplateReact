import React from "react";
import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common";
import { UserTemplate } from "../templates";
import { LoginPage, RegisterPage } from "../pages";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
    },
    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },
    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
