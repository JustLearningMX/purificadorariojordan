import { Routes, Route } from 'react-router-dom';
import { NOSOTROS, SERVICIOS, CONTACTO, SIGNUP, LOGIN } from '../config/router/paths.js';
import { Nosotros } from '../components/Main/Principal/Nosotros';
import { Servicios } from '../components/Main/Principal/Servicios';
import { Contacto } from '../components/Main/Principal/Contacto';
import { Signup } from '../components/Main/Principal/Signup';
import { Login } from '../components/Main/Principal/Login';

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
        </Routes>
        
    </main>
  );
}
