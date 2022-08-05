/**
 * Componente que redirecciona al usuario invitado (cuando
 * no está autenticado): Login, Signup
 */

 import { Navigate, Outlet } from 'react-router-dom';
 import { useAuthContext } from '../../hooks/useAuthContext';
 import { USUARIO_ } from '../../config/router/paths';
 
 export function UserGuestRoutes() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
     
    const {isAuthenticated} = useAuthContext();
    return isAuthenticated ? <Navigate to={`/${USUARIO_}/${userToken.id}/`}/> : <Outlet />;
 }