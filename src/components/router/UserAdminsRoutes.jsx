/**
 * Componente para usuarios empleados y admins
 */

 import { Navigate, Outlet } from 'react-router-dom';
 import { useAuthContext } from '../../hooks/useAuthContext';
 
 export function UserAdminsRoutes() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

   const { admin } = userToken;
     
    const {isAuthenticated} = useAuthContext();

    return (isAuthenticated && !admin) ? <Navigate to={`/usuario/${userToken.id}/`}/> : <Outlet />;
          
 }