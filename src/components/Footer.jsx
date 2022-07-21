import styles from '../css/Footer.module.css';
import { Derechos } from './Footer/Derechos';
import { Direccion } from './Footer/Direccion';
import { Logo } from './Footer/Logo';
import { MapaNavegacion } from './Footer/MapaNavegacion';
import { RedesSociales } from './Footer/RedesSociales';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <Logo />
            <MapaNavegacion />
            <RedesSociales />
            <Direccion />
            <Derechos />
        </footer>        
    );
}