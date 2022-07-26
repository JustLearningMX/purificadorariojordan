/**
 * Función para manejar un contexto global en React
 */

import { createContext, useState } from "react";

export const AuthContext = createContext(); // --> Tiene el objeto Provider

export function AuthContextProvider( {children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={isAuthenticated}>
            {children}
        </AuthContext.Provider>
    );

}