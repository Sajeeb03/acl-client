import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../Contexts/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    const location = useLocation();

    if (loading || adminLoading) {
        console.log("loading")
        return <Loader />
    }

    // console.log(admin)

    if (user?.uid && isAdmin) {
        return children;
    }

    else {
        // console.log("not working")
        logOut();
        return <Navigate to="/user/login" state={{ from: location }} replace></Navigate>
    }
}

export default AdminRoute;