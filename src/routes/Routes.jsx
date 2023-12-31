import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layout/MainLayout";
import AllAssignments from "../pages/AllAssignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAssignment from "../pages/MyAssignment";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SingleAssignment from "../pages/SingleAssignment";
import UpdateAssignment from "../pages/UpdateAssignment";
import PrivateRoutes from "./PrivateRoutes";
import AssignmentSubmission from "../pages/AssignmentSubmission";
import SubmittedAssignments from "../pages/SubmittedAssignments";
import GiveMark from "../pages/GiveMark";

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
                element: <PrivateRoutes><SingleAssignment></SingleAssignment></PrivateRoutes>,
            },

            {
                path:'/create-assignment',
                element: <PrivateRoutes><CreateAssignment></CreateAssignment></PrivateRoutes>,
            },
            {
                path: '/update-assignment/:id',
                element: <PrivateRoutes><UpdateAssignment></UpdateAssignment></PrivateRoutes>,
                loader: ({params}) => fetch(`https://online-group-study-server-side.vercel.app/update-assignment/${params.id}`),
            },
            {
                path:'/my-assignment',
                element: <PrivateRoutes><MyAssignment></MyAssignment></PrivateRoutes>,
            },
            {
                path:'/assignment-submission',
                element: <PrivateRoutes><AssignmentSubmission></AssignmentSubmission></PrivateRoutes>,
            },
            {
                path:'/submitted-assignment',
                element: <PrivateRoutes><SubmittedAssignments></SubmittedAssignments></PrivateRoutes>,
            },
            {
                path:'/give-mark/:assignmentId',
                element: <PrivateRoutes><GiveMark></GiveMark></PrivateRoutes>,
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