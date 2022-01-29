
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
    async function login(email,password) {
        return await auth.signInWithEmailAndPassword(email,password,)
    }
    function updateProfile(displayName) {
        return currentUser.updateProfile({displayName: displayName})
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
        updateProfile,
        

    }


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}
