/**
 * Componente que protege redirecciona
 * al usuario cuando ya está autenticado
 */

 import { Navigate, Outlet } from 'react-router-dom';
 import { DASHBOARD } from '../../config/router/paths';
 import { useAuthContext } from '../../hooks/useAuthContext';
 
 export function PublicRoute(){
     
    const isAuthenticated = useAuthContext();

    return isAuthenticated ? <Navigate to={DASHBOARD}/> : <Outlet />;
 }