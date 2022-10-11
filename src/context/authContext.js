/**
 * Función para manejar un contexto global en React
 */

import { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext(); // --> Tiene el objeto Provider

export function AuthContextProvider( {children}) {

    const [isUserUpdate, setIsUserUpdate] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    const [usuario, setUsuario] = useState(window.localStorage.getItem("UsuarioPurificadora"));
    const login = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback( () => {
            window.localStorage.removeItem("usuarioLogueadoPurificadora", true);
            window.localStorage.removeItem("UsuarioPurificadora", true);
            setIsAuthenticated(false);
            setUsuario(null);
        }, []);

    const value = useMemo( ()=> (
        {
            login,
            logout,
            isAuthenticated,
            isUserUpdate,
            setIsUserUpdate,
            usuario,
            setUsuario
        }
    ), [isAuthenticated, login, logout, isUserUpdate, usuario, setUsuario]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}