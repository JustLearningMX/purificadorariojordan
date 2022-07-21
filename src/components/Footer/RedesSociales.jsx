import styles from '../../css/Footer.module.css';
import { Icono } from '../Icono';
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
                    <Icono icon={Facebook} height='100%' color='var(--second-text-color)' width='auto' cursor={true} function={()=>handleClick('Facebook')} />
                </figure>
                <figure className={`${styles.figure}`} >
                    <Icono icon={InstagramWithCircle} height='100%' color='var(--second-text-color)' width='auto' cursor={true} function={()=>handleClick('Instagram')} />
                </figure>
                <figure className={`${styles.figure}`} >
                    <Icono icon={Whatsapp} height='100%' color='var(--second-text-color)' width='auto' cursor={true} function={()=>handleClick('Whatsapp')} />
                </figure>
            </div>
            
        </section>
    );
}

function handleClick(icono) {
    console.log(`Click en el ícono ${icono} `)
}