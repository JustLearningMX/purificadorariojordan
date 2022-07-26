/**
 * Componente que protege rutas y redirecciona
 * según sea el caso
 */

import { Navigate, Outlet } from 'react-router-dom';
import { USUARIOS, LOGIN } from '../../config/router/paths';
import { useAuthContext } from '../../hooks/useAuthContext';

export function PrivateRoute(){
    
    const isAuthenticated = useAuthContext();

    return !isAuthenticated ? <Navigate replace to={(USUARIOS + LOGIN)} /> : <Outlet />;
}