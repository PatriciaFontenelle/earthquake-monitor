import Navbar from "./components/Layout/Navbar";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

export default router;