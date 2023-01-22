import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layouts/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
    }
])


export default router;