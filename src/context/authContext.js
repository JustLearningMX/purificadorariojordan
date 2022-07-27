/**
 * Función para manejar un contexto global en React
 */

import { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext(); // --> Tiene el objeto Provider

export function AuthContextProvider( {children}) {

    const isLogueado = window.localStorage.getItem("usuarioLogueadoPurificadora") ? true : false;

    const [isAuthenticated, setIsAuthenticated] = useState(isLogueado);    

    const login = useCallback(() => setIsAuthenticated(true), []);

    const logout = useCallback( () => {
            window.localStorage.removeItem("usuarioLogueadoPurificadora");
            setIsAuthenticated(false)
        }, []);

    const value = useMemo( ()=> (
        {
            login,
            logout,
            isAuthenticated
        }
    ), [isAuthenticated, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}