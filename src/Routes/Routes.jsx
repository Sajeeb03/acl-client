import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AuthLayout from "../Pages/Layouts/AuthLayout/AuthLayout";
import Layout from "../Pages/Layouts/Root/Layout";

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
                element: <Register />
            }
        ]
    }
])


export default router;