import styles from '../../css/Footer.module.css';

export function PuntoMaps() {
  return (
    <section className={`${styles.containers} ${styles.ubicacionContainer}`}>
      <div className={`${styles.mapsContainer}`}>
        <iframe
          title="Ubicación fisica de la purificadora"
          src="https://www.google.com/maps/embed?pb=!4v1658420592994!6m8!1m7!1s1xE3wF0oKbkZHj55TcOiPw!2m2!1d22.25933512998179!2d-97.8315883580807!3f140.50635!4f0!5f0.7820865974627469"
          width="100%"
        //   height="auto"
          style={{border: "0"}}
          allowFullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
