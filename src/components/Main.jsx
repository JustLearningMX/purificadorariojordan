import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute'
import { UserEmpresaRoutes } from './router/UserEmpresaRoutes';
import { UserAdminsRoutes } from './router/UserAdminsRoutes';
import { UserGuestRoutes } from './router/UserGuestRoutes';
import { NOSOTROS, SERVICIOS, CONTACTO, USUARIOS, SIGNUP, LOGIN,
         USUARIO, WELCOME, DASHBOARD, COMPRAS, LOGOUT, 
         EMPRESA, VENTAS, ADMIN, CATALOGOS, REPORTES } from '../config/router/paths.js';
import { Nosotros } from '../components/Main/Principal/Nosotros';
import { Servicios } from '../components/Main/Principal/Servicios';
import { Contacto } from '../components/Main/Principal/Contacto';
import { Login } from '../components/Main/Principal/Login';
import { Signup } from '../components/Main/Principal/Signup';
import { Welcome } from './Main/Usuario/Welcome.jsx';
import { Dashboard } from './Main/Usuario/Dashboard.jsx';
import { Compras } from './Main/Usuario/Compras.jsx';
import { Logout } from './Main/Usuario/Logout.jsx';
import { Ventas } from './Main/Usuario/Ventas.jsx';
import { Catalogos } from './Main/Usuario/Catalogos.jsx';
import { Reportes } from './Main/Usuario/Reportes.jsx';

import styles from "../css/Main.module.css";

export function Main() {
  return (
    <main className={styles.main}>
      
        <Routes>

          {/**MENÚ PRINCIPAL */}
          <Route path={NOSOTROS} element={<Nosotros />} />                      
          <Route path={SERVICIOS} element={<Servicios />} />                      
          <Route path={CONTACTO} element={<Contacto />} />

          {/**MENÚ DE USUARIOS INVITADOS */}
          <Route path={USUARIOS} element={ <UserGuestRoutes/> }>
            <Route path={USUARIOS} element={ <Navigate replace to={LOGIN} /> } />
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGNUP} element={<Signup />} />
          </Route>

          {/**MENÚ DE USUARIOS, OPCIONES PARA TODOS */}
          <Route path={USUARIO} element={ <PrivateRoute/> }>           
            <Route index element={<Welcome />} />
            <Route path={WELCOME} element={<Welcome />} />
            <Route path={DASHBOARD} element={<Dashboard />} />
            <Route path={COMPRAS} element={<Compras />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>

          {/**MENÚ DE USUARIOS DE LA EMPRESA: EMPLEADOS Y ADMINIS */}
          <Route path={EMPRESA} element={ <UserEmpresaRoutes/> }>
            <Route path={EMPRESA} element={ <Navigate replace to={VENTAS} /> } />
            <Route path={VENTAS} element={<Ventas />} />
          </Route>

          {/**MENÚ DE USUARIOS DE LA EMPRESA: SÓLO ADMINIS */}
          <Route path={ADMIN} element={ <UserAdminsRoutes/> }>
            <Route path={ADMIN} element={ <Navigate replace to={CATALOGOS} /> } />
            <Route path={CATALOGOS} element={<Catalogos />} />
            <Route path={REPORTES} element={<Reportes />} />
          </Route>

          <Route path="*" element={<Navigate replace to={NOSOTROS} />} />

        </Routes>
        
    </main>
  );
}
