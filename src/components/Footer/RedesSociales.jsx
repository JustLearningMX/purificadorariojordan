import styles from '../../css/Footer.module.css';
import stylesIcons from '../../css/varios/Icons.module.css';
import { Facebook } from '@styled-icons/material';
import { InstagramWithCircle } from '@styled-icons/entypo-social';
import { Whatsapp } from '@styled-icons/bootstrap';

export function RedesSociales(){
    return (
        <section className={`${styles.containerRedes} ${styles.containers}`}>
            <div>
                <p className={styles.title}>Nuestras redes sociales</p>
            </div>         
            
            <div className={`${styles.icons_container}`} >
                <figure className={`${styles.figure}`} >
                    <Facebook onClick={()=>handleClick('Facebook')} className={ `${stylesIcons.icono} ${stylesIcons.iconoFooter}`} />
                </figure>
                <figure className={`${styles.figure}`} >
                    <InstagramWithCircle onClick={()=>handleClick('Instagram')} className={ `${stylesIcons.icono} ${stylesIcons.iconoFooter}` } />
                </figure>
                <figure className={`${styles.figure}`} >
                    <Whatsapp onClick={()=>handleClick('Whatsapp')} className={ `${stylesIcons.icono} ${stylesIcons.iconoFooter}` } />
                </figure>
            </div>
            
        </section>
    );
}

function handleClick(icono) {
    console.log(`Click en el ícono ${icono} `)
}