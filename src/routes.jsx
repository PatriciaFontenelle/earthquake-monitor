import Navbar from "./components/Layout/Navbar";
import { createHashRouter } from "react-router";
import Home from "./pages/Home";

const router = createHashRouter([
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