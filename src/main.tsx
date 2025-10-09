import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

const router = createBrowserRouter(routes, { basename: "/" });

createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
