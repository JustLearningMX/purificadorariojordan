/**
 * Componente que protege redirecciona
 * al usuario cuando ya está autenticado
 */

 import { Navigate, Route } from 'react-router-dom';
 import { DASHBOARD } from '../../config/router/paths';
 // import useAuthContext from '../../hooks/useauthContext';
 
 export function PublicRoute(props){
     // const [isAuthenticated] = useAuthContent();
     const isAuthenticated = false;
 
     if(isAuthenticated) {
         return <Navigate to={DASHBOARD} replace/>
     }
 
     return <Route {...props} />
 }