/**
 * Función que permite hacer uso del AuthContextProvider
 */

import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export function useAuthContext() {
    return useContext(AuthContext);
}