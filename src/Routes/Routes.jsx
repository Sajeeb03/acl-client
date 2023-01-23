import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AuthLayout from "../Pages/Layouts/AuthLayout/AuthLayout";
import Layout from "../Pages/Layouts/Root/Layout";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
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
                element: <ManagerRoute><Register /></ManagerRoute>
            }
        ]
    }
])


export default router;