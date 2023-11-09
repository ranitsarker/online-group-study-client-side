import PropTypes from "prop-types"; 
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../config/Firebase.Config";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user
    const createUser = async (email, password, displayName, photoURL) => {
        setLoading(true);

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update the user's profile with the provided displayName and photoURL
            await updateProfile(result.user, {
                displayName,
                photoURL,
            });

            setUser(result.user);

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // login user
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    // logout user
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    
    const values = {
        user,
        createUser,
        loginUser,
        googleLogin,
        logOut,
        loading,

    }

    // current user checker 
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loginUserEmail = {email: userEmail};
            setUser(currentUser);
            console.log('current user: ', currentUser);
            setLoading(false);
            // token
            if(currentUser){
                const loginUserEmail = {email: userEmail}
                axios.post('http://localhost:5000/jwt', loginUserEmail, {withCredentials: true})
                .then(data =>{
                    console.log('token response:', data.data)
                })
            }
            else{
                axios.post('http://localhost:5000/logout', loginUserEmail, {
                    withCredentials: true
                })
                .then(data => {
                    console.log('after user logged out: ', data)
                })
            }
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
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AuthProvider;