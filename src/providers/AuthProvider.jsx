import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createContext, useState } from "react";
import app from "../config/Firebase.Config";

export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const values = {
        user,
        createUser

    }
    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;