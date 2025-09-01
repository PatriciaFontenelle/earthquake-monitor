import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { NavProvider } from "./contexts/NavContext.jsx";
import router from "./routes.jsx";
import { DataProvider } from "./contexts/dataContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <NavProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </NavProvider>
);
