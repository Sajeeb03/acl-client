import React, { createContext, useState } from 'react'
import { app } from '../Firebase/firebase.config';
import { getAuth } from "firebase/auth"

const auth = getAuth(app)
export const AuthContext = createContext();



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const authInfo = {
        user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider