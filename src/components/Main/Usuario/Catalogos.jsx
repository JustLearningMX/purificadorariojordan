import { Outlet } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { ADMIN, CATALOGOS, CTL_CLIENTES, CTL_EMPLEADOS, CTL_PRODUCTOS, CTL_PROVEEDORES, CTL_SUCURSALES } from '../../../config/router/paths.js';
import styles from '../../../css/usuarios/Catalogos.module.css';

export function Catalogos() {

    return (
        <section className={styles.contenedorPrincipal}>
            <article className={styles.contenedorLinks}>
                <div className={styles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_CLIENTES} onClick={()=>handleClick(0)}>Clientes</Link>
                </div>
                <div className={styles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_EMPLEADOS} onClick={()=>handleClick(1)}>Empleados</Link>
                </div>
                <div className={styles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_PRODUCTOS} onClick={()=>handleClick(2)}>Productos</Link>
                </div>
                <div className={styles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_PROVEEDORES} onClick={()=>handleClick(3)}>Proveedores</Link>
                </div>
                <div className={styles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_SUCURSALES} onClick={()=>handleClick(4)}>Sucursales</Link>
                </div>
            </article >
            <article className={styles.contenedorBuscadorYagregar}>
            </article>
            <article className={styles.contenedorOutlet} >
                <Outlet />
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