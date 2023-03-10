import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { baseURL } from '../../../assets/baseUrl';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useJwtToken from '../../../Hooks/useToken';
import SocialLogin from '../SocialLogin/SocialLogin';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registration, updateUser } = useContext(AuthContext)
    const [generalError, setGeneralError] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [token] = useJwtToken(userEmail);
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const navigate = useNavigate();
    const cookies = new Cookies();


    if (token) {
        cookies.set('accessToken', token, { path: "/" })
        navigate(from, { replace: true });
    }

    const handleRegister = async data => {
        // console.log(data)
        const user = { name: data.name, email: data.email, role: "user" }
        try {
            const res = await registration(data.email, data.password);
            const response = await updateUser(data.name);
            addUser(user);
            setUserEmail(data.email)
            setGeneralError("");

        } catch (error) {
            setGeneralError(error.message);
            setUserEmail("");
        }
    }


    const addUser = async (user) => {
        try {
            const res = await axios.post(`${baseURL}/users?email=${user.email}`, user);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='loginContainer'>
            <div className='login-card'>
                <h4 className='text-center mb-2'>Register With</h4>

                <SocialLogin
                    setGeneralError={setGeneralError}
                />


                <h5 className='text-center'>Or</h5>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <input
                        type="text"
                        className='inputs'
                        placeholder='Name'
                        {...register("name", { required: "Name is required" })}
                    />
                    {
                        errors.name && <span className='text-danger'>{errors.name.message}</span>
                    }
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
                        className="submit-btn text-white fw-bold py-2 mt-3"
                    >Sign Up</button>
                </form>
                {
                    generalError && <span className='text-danger'>{generalError}</span>
                }
                <p className='mt-1 text-center'>Already have an account? <Link to="/user/login" className='text-decoration-none'><span>Sign In</span></Link></p>
            </div>
        </div>
    )
}

export default Register