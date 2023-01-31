import axios from "axios";
import { useEffect, useState } from "react"
import { baseURL } from "../assets/baseUrl";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState();
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        if (email) {
            axios(`${baseURL}/user/${email}`)
                .then(res => {
                    setIsAdmin(res.data);
                    setAdminLoading(false);
                })
                .catch(err => console.log(err))
        }
        else {
            setAdminLoading(false)
        }
    }, [email]);

    return [isAdmin, adminLoading]
}


export default useAdmin;