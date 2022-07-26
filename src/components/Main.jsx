import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute'
import { PublicRoute } from './router/PublicRoute';
import { UserGuestRoutes } from './router/UserGuestRoutes';
import { USUARIOS, NOSOTROS, SERVICIOS, CONTACTO, SIGNUP, LOGIN, DASHBOARD } from '../config/router/paths.js';
import { Nosotros } from '../components/Main/Principal/Nosotros';
import { Servicios } from '../components/Main/Principal/Servicios';
import { Contacto } from '../components/Main/Principal/Contacto';
import { Signup } from '../components/Main/Principal/Signup';
import { Login } from '../components/Main/Principal/Login';
import { Dashboard } from './Main/Usuario/Dashboard.jsx';

import styles from "../css/Main.module.css";

export function Main() {
  return (
    <main className={styles.main}>
      
        <Routes>

          <Route path={NOSOTROS} element={<Nosotros />} />                      
          <Route path={SERVICIOS} element={<Servicios />} />                      
          <Route path={CONTACTO} element={<Contacto />} />

          <Route path={USUARIOS} element={ <UserGuestRoutes/> }>
             <Route path={USUARIOS} element={ <Navigate replace to={LOGIN} /> } />
             <Route path={LOGIN} element={<Login />} />
             <Route path={SIGNUP} element={<Signup />} />
           </Route>

          {/* <Route path={SIGNUP} element={<PublicRoute />} > 
            <Route path={SIGNUP} element={<Signup />} />
          </Route>
          <Route path={LOGIN} element={<PublicRoute />} > 
            <Route path={LOGIN} element={<Login />} />
          </Route> */}

          <Route path={DASHBOARD} element={<PrivateRoute />} > 
            <Route path={DASHBOARD} element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate replace to={NOSOTROS} />} />

        </Routes>
        
    </main>
  );
}
