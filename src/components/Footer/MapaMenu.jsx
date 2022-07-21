import { stringToColor } from "../../utils/stringToColor.js";
import styles from '../../css/Footer.module.css';

const color = (string) => {
    // console.log(stringToColor(string));
    return stringToColor(string);
}

const liOpcion = (opcion, i)=>{
    return (
        <li className={styles.opcionMenu} key={i}>
            {opcion}
        </li>
    );
};

export function MapaMenu(props){
    return (        
        <div className={styles.contenedorMapa}>
            <p 
                style={{color: `${color(props.nombre)}`, borderLeft: `2px solid ${color(props.nombre)}`}}                
                className={styles.subtitulo}
            >
                {props.nombre}
            </p>
            <ul>
                {
                    props.array.map( (opcion, i)=>{
                        return liOpcion(opcion, i);
                    })
                }
            </ul>
        </div>
    );
}