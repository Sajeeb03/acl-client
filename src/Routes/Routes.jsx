import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Home from "../Pages/Dashboard/Home/Home";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AuthLayout from "../Pages/Layouts/AuthLayout/AuthLayout";
import Layout from "../Pages/Layouts/Root/Layout";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

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
                element: <AdminRoute><ManageUsers /></AdminRoute>
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