
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc, setDoc,  } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';


const AuthContext = createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    async function register(email, password, username) {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        res.user.updateProfile({ displayName: username })
        setDoc(doc(db, "user", res.user.uid), {
            uid:res.user.uid,
            qty:0,
            totalPrice:0,
            shoppingCart: [], 
            passwordUser: password,
            avatar: 'https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1884971.jpg',
        })

    }
     function login(email, password) {
        return  auth.signInWithEmailAndPassword(email, password)
    }
    
    async function upload (file, currentUser) {
        const fileRef =  ref(storage, `image/${currentUser?.uid}.png` ) 
        // setLoading(true)
        const snapshot = await uploadBytes(fileRef, file)
        const photoURL = await getDownloadURL(fileRef)
        currentUser.updateProfile({
            photoURL
        })
        // setLoading(false)
        

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
        logOut,
        upload


    }
   


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}
