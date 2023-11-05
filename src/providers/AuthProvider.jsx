import { createContext } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({childern}) => {

    return(
        <AuthContext.Provider>
            {childern}
        </AuthContext.Provider>
    );
};
export default AuthProvider;