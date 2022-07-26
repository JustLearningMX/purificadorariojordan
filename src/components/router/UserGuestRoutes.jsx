/**
 * Componente que redirecciona al usuario invitado (cuando
 * no está autenticado): Login, Signup
 */

 import { Navigate, Outlet } from 'react-router-dom';
 import { DASHBOARD } from '../../config/router/paths';
 import { useAuthContext } from '../../hooks/useAuthContext';
 
 export function UserGuestRoutes(){
     
    const isAuthenticated = useAuthContext();

    return isAuthenticated ? <Navigate replace to={DASHBOARD}/> : <Outlet />;
 }

//  <Route path={USUARIOS} element={ <UserGuestRoutes/> }>
//             <Route path={USUARIOS} element={ <Navigate replace to={LOGIN} /> } />
//             <Route path={LOGIN} element={<Login />} />
//             <Route path={SIGNUP} element={<Signup />} />
//           </Route>

//           <Route path={USUARIO} element={ <PrivateRoute/> }>
//             <Route path={USUARIO} element={ <Navigate replace to={DASHBOARD} /> } />
//             <Route path={DASHBOARD} element={<Dashboard />} />
// </Route>