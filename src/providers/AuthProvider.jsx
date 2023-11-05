import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../config/Firebase.Config";

export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // login user
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    // logout user
    const logOut = () => {
        return signOut(auth);
    }
    
    const values = {
        user,
        createUser,
        loginUser,
        logOut

    }

    // current user checker 
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, []);

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;