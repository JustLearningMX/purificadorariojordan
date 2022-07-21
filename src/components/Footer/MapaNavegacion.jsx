import { arrayMenu } from '../../data/arrayMenu.js';
import { MapaMenu } from './MapaMenu.jsx';
import styles from '../../css/Footer.module.css';

export function MapaNavegacion() {
    return (
        <section className={`${styles.containers}`}>
            <p className={`${styles.title}`}>Mapa de Navegación</p>
            <MapaMenu nombre='Menú principal' array={arrayMenu.principal} />
            <MapaMenu nombre='Usuario invitado' array={arrayMenu.userGuest} />
        </section>
    );
};