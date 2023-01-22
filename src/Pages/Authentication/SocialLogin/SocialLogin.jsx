import React from 'react'
import "./SocialLogin.css"
import fb from "../../../assets/icons/fb.png"
import go from "../../../assets/icons/go.png"
import ms from "../../../assets/icons/ms.png"

const SocialLogin = () => {
    return (
        <div className='d-flex justify-content-center gap-3'>
            <div className='iconContainer'>
                <img src={fb} className="socialIcons" alt="" />
            </div>
            <div className='iconContainer'>
                <img src={go} className="socialIcons" alt="" />
            </div>
            <div className='iconContainer'>
                <img src={ms} className="socialIcons" alt="" />
            </div>
        </div>
    )
}

export default SocialLogin