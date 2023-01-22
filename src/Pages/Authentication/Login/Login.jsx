import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import "./Login.css"

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = data => {
        console.log(data)
    }
    return (
        <div className='loginContainer'>
            <div className='login-card'>
                <h3 className='text-center'>Sign In</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input type="email" className='inputs' placeholder='Email' />
                    <input type="password" className='inputs my-3' placeholder='Password' />
                    <button type="submit" class="submit-btn text-white fw-bold py-2">Sign In</button>
                </form>
                <h5 className='text-center'>Or</h5>
                <SocialLogin />
                <p className='mt-1 text-center'>New Here? <Link to="/user/register" className='text-decoration-none'><span>Sign Up Now</span></Link></p>
            </div>
        </div>
    )
}

export default Login