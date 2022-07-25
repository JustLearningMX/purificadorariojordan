import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute'
import { PublicRoute } from './router/PublicRoute';
import { NOSOTROS, SERVICIOS, CONTACTO, SIGNUP, LOGIN, DASHBOARD } from '../config/router/paths.js';
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
          <Route path={SIGNUP} element={<Signup />} />                      
          <Route path={LOGIN} element={<Login />} />
          {/* <Route 
            path={LOGIN} 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          /> */}
          <Route 
            path={DASHBOARD} 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
        
    </main>
  );
}
