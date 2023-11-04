import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layout/MainLayout";
import AllAssignments from "../pages/AllAssignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAssignment from "../pages/MyAssignment";
import SubmittedAssignment from "../pages/SubmittedAssignment";
import Login from "../pages/Login";

const allRoutes = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element: <Home></Home>,
            },
            {
                path:'/assignments',
                element: <AllAssignments></AllAssignments>,
            },
            {
                path:'/create-assignment',
                element: <CreateAssignment></CreateAssignment>,
            },
            {
                path:'/my-assignment',
                element: <MyAssignment></MyAssignment>,
            },
            {
                path:'/submitted-assignment',
                element: <SubmittedAssignment></SubmittedAssignment>,
            },
            {
                path:'/login',
                element: <Login></Login>,
            },



        ]
    }
]);

export default allRoutes;