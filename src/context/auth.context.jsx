import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../database/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setIsLoggedIn(true);
        } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }
        
    }

    return (
        <AuthContext.Provider value={{currentUser, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}