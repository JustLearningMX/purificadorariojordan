/**Dibuja la pantalla principal del Area de Catalogos */
import { Outlet } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { ADMIN, CATALOGOS, CTL_CLIENTES, CTL_EMPLEADOS, CTL_PRODUCTOS, CTL_PROVEEDORES, CTL_SUCURSALES } from '../../../config/router/paths.js';
import pestanasStyles from '../../../css/varios/Pestanhas.module.css';
import styles from         '../../../css/usuarios/Catalogos.module.css';

export function Catalogos() {

    //Va creando cada pestanha
    return (
        <section className={pestanasStyles.contenedorPrincipal}>
            <h1 className={pestanasStyles.tituloSeccion}>Catálogos</h1>
            <article className={pestanasStyles.contenedorLinks}>
                <div className={pestanasStyles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_CLIENTES} onClick={()=>handleClick(0)}>Clientes</Link>
                </div>
                <div className={pestanasStyles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_EMPLEADOS} onClick={()=>handleClick(1)}>Empleados</Link>
                </div>
                <div className={pestanasStyles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_PRODUCTOS} onClick={()=>handleClick(2)}>Productos</Link>
                </div>
                <div className={pestanasStyles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_SUCURSALES} onClick={()=>handleClick(3)}>Sucursales</Link>
                </div>
                <div className={pestanasStyles.links}>
                    <Link to={`${ADMIN}${CATALOGOS}/` + CTL_PROVEEDORES} onClick={()=>handleClick(4)}>Proveedores</Link>
                </div>
            </article >
            <article className={styles.contenedorOutlet} > {/**Aqui se pinta la info de cada pestanha */}
                <Outlet />
            </article>
        </section>
    );
}

/**Funcion que resalta la pestanha actual seleccionada */
function handleClick(pos){

    const links = document.getElementsByClassName(`${pestanasStyles.links}`);
    
    for(let i=0; i < links.length; i++){
        if(links[i].classList.contains(`${pestanasStyles.link_selected}`))
            links[i].classList.toggle(`${pestanasStyles.link_selected}`)
    }
    
    links[pos].classList.toggle(`${pestanasStyles.link_selected}`);
}