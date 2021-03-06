import { lazy } from "react";

export const route = {
  path: "/authentication/password",
  name: "ROUTE:FORGOT_PASSWORD",
  exact: true,
  layout: "admin",
  component: lazy(() => import(".")),
};
