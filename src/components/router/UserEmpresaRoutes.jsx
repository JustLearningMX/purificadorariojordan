/**
 * Componente para usuarios empleados y admins
 */

 import { Navigate, Outlet } from 'react-router-dom';
 import { useAuthContext } from '../../hooks/useAuthContext';
//  import { EMPRESA } from '../../config/router/paths';
 
 export function UserEmpresaRoutes() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

   const { admin, empleado } = userToken;
     
    const {isAuthenticated} = useAuthContext();

    return (isAuthenticated && !admin && !empleado) ? <Navigate to={`/usuario/${userToken.id}/`}/> : <Outlet />;
    // if (isAuthenticated && !admin && !empleado) { 
    //   console.log('entró aqui 1')
    //   return <Navigate to={`/usuario/${userToken.id}/`}/>
    // } else {
    //   console.log('entró aqui 2')
    //   return <Outlet />;
    // }
          
 }