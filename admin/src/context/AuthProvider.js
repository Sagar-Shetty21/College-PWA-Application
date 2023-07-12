import { createContext, useState } from 'react';
import Cookies from 'universal-cookie';



const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const cookies = new Cookies(); 
    const [auth, setAuth] = useState(cookies.get('admin'));
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;