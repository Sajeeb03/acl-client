import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Home from "../Pages/Dashboard/Home/Home";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AuthLayout from "../Pages/Layouts/AuthLayout/AuthLayout";
import Layout from "../Pages/Layouts/Root/Layout";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/manage",
                element: <PrivateRoute><ManageUsers /></PrivateRoute>
            }
        ]
    },
    {
        path: "/user",
        element: <AuthLayout />,
        children: [
            {
                path: "/user/login",
                element: <Login />
            },
            {
                path: "/user/register",
                element: <Register />
            }
        ]
    }
])


export default router;