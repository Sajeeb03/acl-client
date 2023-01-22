import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../Shared/Header/Header'

const AuthLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default AuthLayout