import { useEffect, useState } from 'react';
import { CardUser } from './CardUser';
import { Outlet } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { DASHBOARD, DASHDATOS, DASHDIRECCION, DASHMISCELANEOS } from '../../../config/router/paths.js';
import styles from '../../../css/usuarios/Dashboard.module.css';
import { useAuthContext } from '../../../hooks/useAuthContext';

export function Dashboard(){

    const { isUserUpdate } = useAuthContext();

    const [usuario, setUsuario] = useState(window.localStorage.getItem("UsuarioPurificadora"));
    
    useEffect(()=> {
        if(isUserUpdate){
            setUsuario(JSON.parse(window.localStorage.getItem("UsuarioPurificadora")));
        }
    }, [isUserUpdate]);

    useEffect(()=>{        
        setUsuario(JSON.parse(window.localStorage.getItem("UsuarioPurificadora")));
    }, []);

    return ( 
        <section className={styles.contenedorPrincipal}>
            <article className={styles.contenedorCard}>
                <CardUser usuarios={[usuario]}/>            
            </article>

            <article className={styles.contenedorEliminar}>
                Eliminar mi cuenta.
            </article>

            <article className={styles.contenedorDatos}>
                <div className={styles.contenedorLinks}>
                    <div className={styles.links}>
                        <Link to={`/usuario/${usuario.id}/` + DASHBOARD + '/' + DASHDATOS} onClick={()=>handleClick(0)}>Datos</Link>
                    </div>
                    <div className={styles.links}>
                        <Link to={`/usuario/${usuario.id}/` + DASHBOARD + '/' + DASHDIRECCION} onClick={()=>handleClick(1)}>Dirección</Link>
                    </div>
                    <div className={styles.links}>
                        <Link to={`/usuario/${usuario.id}/` + DASHBOARD + '/' + DASHMISCELANEOS} onClick={()=>handleClick(2)}>Misceláneo</Link>
                    </div>
                </div>
                <div className={styles.formularios}>
                    <Outlet />
                </div>
            </article>
        </section>
    );
}

function handleClick(pos){

    const links = document.getElementsByClassName(`${styles.links}`);

    for(let i=0; i < links.length; i++){
        if(links[i].classList.contains(`${styles.link_selected}`))
            links[i].classList.toggle(`${styles.link_selected}`)
    }
    
    links[pos].classList.toggle(`${styles.link_selected}`);
}