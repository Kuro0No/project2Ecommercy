
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'


const AuthContext = createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    async function register(email, password, username) {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        res.user.updateProfile({ displayName: username })
    }
    async function login(email, password) {
        return await auth.signInWithEmailAndPassword(email, password,)
    }
    function updateProfile(displayName) {
        return currentUser.updateProfile({ displayName: displayName })
    }
    function logOut() {
        return auth.signOut()
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
        logOut,


    }


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}
