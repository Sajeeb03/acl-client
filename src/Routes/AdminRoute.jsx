import { useContext } from "react";
import { useGetAdminQuery } from "../app/verifyUser/verifyAdmin";
import { AuthContext } from "../Contexts/AuthProvider";

const { user, loading, logOut } = useContext(AuthContext);

const {
    data,
    isLoading
} = useGetAdminQuery();

if (loading || isLoading) {
    return <p>Loading...</p>
}