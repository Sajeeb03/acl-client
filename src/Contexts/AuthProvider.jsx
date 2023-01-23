import React, { createContext, useEffect, useState } from 'react'
import { app } from '../Firebase/firebase.config';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth"

const auth = getAuth(app)
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registration = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleSignIn = (provider) => {
        return signInWithPopup(auth, provider)
    }

    const microsoftSignIn = (provider) => {
        return signInWithPopup(auth, provider)
    }

    const facebookSignIn = (provider) => {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("user updated", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => { unsubscribe() }
    }, [])

    const authInfo = {
        user,
        loading,
        login,
        registration,
        logOut,
        updateUser,
        googleSignIn,
        microsoftSignIn,
        facebookSignIn
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider