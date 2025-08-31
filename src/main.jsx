import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { NavProvider } from "./contexts/NavContext.jsx";
import router from "./routes.jsx";
import "./index.css";
import { DataProvider } from "./contexts/dataContext.jsx";

createRoot(document.getElementById("root")).render(
  <NavProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </NavProvider>
);
