import logo from '../../assets/logo-footer.png';
import styles from '../../css/Footer.module.css';

export function Logo() {
    return (
        <figure className={`${styles.logoContainer} ${styles.containers}`}>
            <img className={styles.logoImg} src={logo} alt="Logotipo de purificadora río jordán" />
        </figure>
    );
}