import { arrayMenu } from '../../data/arrayMenu.js';
import { MapaMenu } from './MapaMenu.jsx';
import styles from '../../css/Footer.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';

export function MapaNavegacion() {

    const { usuario } = useAuthContext();
    const [userType, setUserType] = useState(null);
    const [userOpts, setUserOpts] = useState(null);

    useEffect(()=> {
        const usuarioTipo = !usuario ? 'invitado' : 
        usuario && JSON.parse(usuario).tipo === 'admin' ? 'administrador' : 
        usuario && JSON.parse(usuario).tipo === 'empleado' ? 'empleado' : 'cliente';
        setUserType(usuarioTipo);
    
        const arrayDeOpciones = !usuario ? arrayMenu.userGuest : 
            usuario && JSON.parse(usuario).tipo === 'admin' ? arrayMenu.userAdmin : 
            usuario && JSON.parse(usuario).tipo === 'empleado' ? arrayMenu.userEmpleado : arrayMenu.userCliente;
            setUserOpts(arrayDeOpciones);

    },[usuario]);

    return userType && userOpts ? (
        <section className={`${styles.containers} ${styles.containerMapa}`}>
            <p className={`${styles.title}`}>Mapa de Navegación</p>
            <MapaMenu nombre='Secciones' array={arrayMenu.principal} />
            <MapaMenu nombre={`Usuario ${userType}`} array={userOpts} />
        </section>
    ) : null;
};