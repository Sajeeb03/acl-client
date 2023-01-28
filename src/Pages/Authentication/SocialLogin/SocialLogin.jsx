import React, { useContext, useState } from 'react'
import "./SocialLogin.css"

//icos
import fb from "../../../assets/icons/fb.png"
import go from "../../../assets/icons/go.png"
import ms from "../../../assets/icons/ms.png"


import { AuthContext } from '../../../Contexts/AuthProvider'
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../../assets/baseUrl'
import useJwtToken from '../../../Hooks/useToken'
import Cookies from 'universal-cookie'




const SocialLogin = ({ setGeneralError }) => {

    const { googleSignIn, microsoftSignIn, facebookSignIn } = useContext(AuthContext)
    const [userEmail, setUserEmail] = useState("");

    //get all social media providers
    const googleProvider = new GoogleAuthProvider();
    const msProvider = new OAuthProvider('microsoft.com');
    const fbProvider = new FacebookAuthProvider();


    //use this function to navigate to certain page
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn(googleProvider);
            const userData = res.user;

            //select all data and send it to the db
            const user = { name: userData.displayName, email: userData.email, role: "user" };
            addUser(user)

            setGeneralError("");
        } catch (error) {
            setGeneralError(error.message)
        }
    }

    const handleMsSignIn = async () => {
        try {
            const res = await microsoftSignIn(msProvider);
            const userData = res.user;

            //select all data and send it to the db
            const user = { name: userData.displayName, email: userData.email, role: "user" };
            addUser(user)

            setGeneralError("");
        } catch (error) {
            setGeneralError(error.message)
        }
    }

    const handleFbSignIn = async () => {
        try {
            const res = await facebookSignIn(fbProvider);
            const userData = res.user;

            //select all data and send it to the db
            const user = { name: userData.displayName, email: userData.email, role: "user" };
            addUser(user)

            setGeneralError("");

        } catch (error) {
            setGeneralError(error.message)
        }
    }

    //saving the user data to db
    const addUser = async (user) => {
        try {
            setUserEmail(user.email);
            const res = await axios.post(`${baseURL}/users?email=${user.email}`, user);

        } catch (error) {
            console.log(error);
            setUserEmail("");
        }
    }

    //get the jwt token
    const [token] = useJwtToken(userEmail);
    const cookies = new Cookies();

    if (token) {
        cookies.set("accessToken", token, { path: "/" })
        navigate("/");
    }


    return (
        <div className='d-flex justify-content-center gap-3'>
            <div onClick={handleFbSignIn} className='iconContainer'>
                <img src={fb} className="socialIcons" alt="" />
            </div>
            <div onClick={handleGoogleSignIn} className='iconContainer'>
                <img src={go} className="socialIcons" alt="" />
            </div>
            <div onClick={handleMsSignIn} className='iconContainer'>
                <img src={ms} className="socialIcons" alt="" />
            </div>
        </div>
    )
}

export default SocialLogin