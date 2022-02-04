import { createContext,useContext,useEffect,useState } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import { dbContext } from "../../DbContext/dbContext";

export const headerContext = createContext()

export const HeaderContextProvider = ({ children }) => {
    const [headerState, setHeaderState] = useState({})
    const {currentUser} = useAuth()
    const dbData = useContext(dbContext).currentUserCart

    useEffect(() => {
        if(currentUser) {
            setHeaderState(dbData)
        }
    }, [dbData,headerState,currentUser])
    
    return (
        <headerContext.Provider value={{setHeaderState, headerState}}>
            {children}
        </headerContext.Provider>
    )

}
export default HeaderContextProvider