/**
 * Componente para usuarios empleados y admins
 */

 import { Navigate, Outlet } from 'react-router-dom';
 import { useAuthContext } from '../../hooks/useAuthContext';
 import { USUARIO_ } from '../../config/router/paths';
 
 export function UserEmpresaRoutes() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

   const { admin, empleado } = userToken;
     
    const {isAuthenticated} = useAuthContext();

    return (isAuthenticated && !admin && !empleado) ? <Navigate to={`/${USUARIO_}/${userToken.id}/`}/> : <Outlet />;
          
 }