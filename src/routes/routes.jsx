import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

const allRoutes = createBrowserRouter([
    {
        path:"/",
        element: <Home></Home>,
        errorElement: <ErrorPage></ErrorPage>,
    }
]);

export default allRoutes;