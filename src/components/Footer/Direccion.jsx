import styles from '../../css/Footer.module.css';
import stylesIcons from '../../css/varios/Icons.module.css';
import { LocationOn } from '@styled-icons/material';

export function Direccion() {
    return (
        <section className={`${styles.containerDireccion} ${styles.containers}`}>
            <div>
                <p className={styles.title}>Ubícanos</p>
            </div>
            <div className={`${styles.direccionDatos_container}`}>
                <figure className={`${styles.figure}`} >
                    <LocationOn className={ `${stylesIcons.icono} ${stylesIcons.iconoDireccion}` } />
                </figure>
                <div className={`${styles.direccionDatos}`}>
                    <p>Calle Necaxa #1705</p>
                    <p>Colonia Hidalgo, Poniente.</p>
                    <p>Ciudad Madero, Tamaulipas.</p>
                    <p>C.P. 89570</p>
                </div>
            </div>
        </section>
    );
}