import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layout/MainLayout";
import AllAssignments from "../pages/AllAssignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAssignment from "../pages/MyAssignment";
import SubmittedAssignment from "../pages/SubmittedAssignment";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SingleAssignment from "../pages/SingleAssignment";
import UpdateAssignment from "../pages/UpdateAssignment";

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
                path:'/assignment/:id',
                element: <SingleAssignment></SingleAssignment>,
            },

            {
                path:'/create-assignment',
                element: <CreateAssignment></CreateAssignment>,
            },
            {
                path: '/update-assignment/:id',
                element: <UpdateAssignment></UpdateAssignment>,
                loader: ({params}) => fetch(`http://localhost:5000/update-assignment/${params.id}`),
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
            {
                path:'/register',
                element: <Register></Register>,
            },



        ]
    }
]);

export default allRoutes;