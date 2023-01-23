import React, { useContext } from 'react'
import "./SocialLogin.css"
import fb from "../../../assets/icons/fb.png"
import go from "../../../assets/icons/go.png"
import ms from "../../../assets/icons/ms.png"
import { AuthContext } from '../../../Contexts/AuthProvider'
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const SocialLogin = () => {
    const { googleSignIn, microsoftSignIn, facebookSignIn } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider();
    const msProvider = new OAuthProvider('microsoft.com');
    const fbProvider = new FacebookAuthProvider();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const res = await googleSignIn(googleProvider);
        navigate("/");
    }

    const handleMsSignIn = async () => {
        const res = await microsoftSignIn(msProvider);
        navigate("/");
    }

    const handleFbSignIn = async () => {
        const res = await facebookSignIn(fbProvider);
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