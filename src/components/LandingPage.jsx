import styles from "../css/LandingPage.module.css";
import img from "../assets/landinPage/background.png";
import footer from "../assets/landinPage/footer_landingPager.png";
import iconoWP from "../assets/landinPage/icono-de-wp.svg";

export function LandingPage() {
  return (
    <section className={styles.mainSection}>
        <article className={styles.mainSection__backgroundContainer}>
            <img className={styles.backgroundContainer_img} src={img} alt="Mujer-tomando-agua" />
        </article>
        <article className={styles.mainSection__information}>
            <div className={styles.information_slogan}>
                <h3>
                    Amor por el agua
                </h3>
            </div>
            <div className={styles.information_iconoWP}>
                <div>
                    <p>
                    En <span>Purificadoras Rio Jordan</span> somos aliados de las hogares y comercios de la zona conurbada de Tampico, 
                    enfocándonos en el tratamiento y distribucion de agua de acuerdo a sus 
                    necesidades específicas, y con una gran calidad e higiene. No dudes en contactarnos
                    y haz tu pedido.
                    </p>
                </div>
                <figure>
                    <a 
                        href="https://api.whatsapp.com/send?phone=528332887211&amp;text=Hola,%20buen%20d%C3%ADa,%20deseo%20m%C3%A1s%20informaci%C3%B3n" 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        <img src={iconoWP} alt="Enviar mensaje de Whatsapp" />
                    </a>
                    <p>Contáctanos!</p>
                </figure>
            </div>
            <div className={styles.information_footer}>
                <img className={styles.footer_img} src={footer} alt="footer-del-landing-page" />
            </div>
        </article>
    </section>
  );
}