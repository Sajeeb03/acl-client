import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../Contexts/AuthProvider';
import useJwtToken from '../../../Hooks/useToken';
import Cookies from 'universal-cookie';

import SocialLogin from '../SocialLogin/SocialLogin';
import "./Login.css"

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [generalError, setGeneralError] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [token] = useJwtToken(userEmail);

    if (token) {
        // console.log(token)
        cookies.set('accessToken', token, { path: "/" })
        navigate("/")
    }


    const handleLogin = async data => {
        // console.log(login)
        try {
            const res = await login(data.email, data.password);
            setGeneralError("");
            setUserEmail(data.email);

        } catch (error) {
            setGeneralError(error.message);
            setUserEmail("");
            console.log(error);
        }
    }


    return (
        <div className='loginContainer'>
            <div className='login-card'>
                <h3 className='text-center'>Sign In</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input
                        type="text"
                        className='inputs mt-3'
                        placeholder='Email'
                        {...register("email",
                            {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                    message: "Invalid Email"
                                }
                            }
                        )} />

                    {
                        errors.email && <span className='text-danger'>{errors.email.message}</span>
                    }
                    <input t
                        type="password"
                        className='inputs mt-3'
                        placeholder='Password'
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be atleast 6 characters"
                            }
                        })}
                    />
                    {
                        errors.password && <span className='text-danger'>{errors.password.message}</span>
                    }

                    <button
                        type="submit"
                        className="submit-btn text-white fw-bold py-2 my-3"
                    >Sign In</button>
                </form>
                {
                    generalError && <span className='text-danger'>{generalError}</span>
                }
                <h5 className='text-center'>Or</h5>

                <SocialLogin
                    setGeneralError={setGeneralError}
                />

                <p className='mt-1 text-center'>New Here? <Link to="/user/register" className='text-decoration-none'><span>Sign Up Now</span></Link></p>
            </div>
        </div>
    )
}

export default Login