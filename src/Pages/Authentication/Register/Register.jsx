import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
import "./Register.css"

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registration, updateUser } = useContext(AuthContext)
    const [generalError, setGeneralError] = useState("");

    const handleRegister = async data => {
        // console.log(data)
        try {
            const res = await registration(data.email, data.password);
            const response = await updateUser(data.name);
            console.log(res.user)
            setGeneralError("");
        } catch (error) {
            setGeneralError(error.message)
        }
    }

    return (
        <div className='loginContainer'>
            <div className='login-card'>
                <h4 className='text-center mb-2'>Register With</h4>
                <SocialLogin />
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