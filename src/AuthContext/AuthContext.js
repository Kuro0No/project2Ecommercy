
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'


const AuthContext = createContext()
export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function register(email,password) {
       return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }
    
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsub
    }, [])


    const value = {
        currentUser,
        register,
        login,
        

    }


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}
