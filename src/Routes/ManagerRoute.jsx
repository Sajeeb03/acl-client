import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetAdminQuery } from "../app/verifyUser/verifyAdmin";
import { AuthContext } from "../Contexts/AuthProvider";

const ManagerRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);

    const { data: manager, isLoading } = useGetAdminQuery(user?.email);

    const location = useLocation();

    if (loading || isLoading) {
        return <p>Loading...</p>
    }

    // console.log(manager)

    if (user?.uid && manager) {
        return children;
    }

    else {
        // console.log("not working")
        logOut()
        return <Navigate to="/user/login" state={{ from: location }} replace></Navigate>
    }
}

export default ManagerRoute;