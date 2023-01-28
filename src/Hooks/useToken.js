import { useEffect, useState } from "react";

import axios from "axios"
import { baseURL } from "../assets/baseUrl"



const useJwtToken = email => {
    const [token, setToken] = useState();
    useEffect(() => {
        if (email) {
            axios(`${baseURL}/jwt?email=${email}`)
                .then(res => {
                    const token = res.data.data;
                    setToken(token);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [email])

    return [token]
}


export default useJwtToken;