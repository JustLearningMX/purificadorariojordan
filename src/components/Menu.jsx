import { NavLink} from 'react-router-dom';
import { NOSOTROS, SERVICIOS, CONTACTO, USUARIOS, SIGNUP, LOGIN,
         COMPRAS, DASHBOARD, REPORTES, VENTAS, CATALOGOS, LOGOUT, 
         EMPRESA, ADMIN, USUARIO_} from '../config/router/paths.js';

const generarLink = (isUserGuest, LinkOpt, props, opcion)=> {

    if(isUserGuest) {         
        return <NavLink to={LinkOpt} className={({isActive}) => activeLink(isActive, props)}>
            {opcion}
        </NavLink>
    } else { //generatePath(USUARIO, {"id": props.userId})
        return <NavLink to={LinkOpt} className={({isActive}) => activeLink(isActive, props)} >
            {opcion}
        </NavLink>
    }
}

export function Menu(props) {

    return (
        <ul>
            {props.opcionesMenu.map((opcion, i)=> {

                const LinkOpt = 
                    (opcion === 'Nosotros') ? NOSOTROS : 
                    (opcion === 'Servicios') ? SERVICIOS :
                    (opcion === 'Contacto') ? CONTACTO :
                    (opcion === 'Login') ? (USUARIOS + LOGIN) : 
                    (opcion === 'Registro') ? (USUARIOS + SIGNUP) :
                    (opcion === 'Mis compras') ? (`/${USUARIO_}/${props.userId}/` + COMPRAS) :
                    (opcion === 'Dashboard') ? (`/${USUARIO_}/${props.userId}/` + DASHBOARD) :
                    (opcion === 'Ventas') ? (EMPRESA + VENTAS) :
                    (opcion === 'Catálogos') ? (ADMIN + CATALOGOS) :
                    (opcion === 'Reportes') ? (ADMIN + REPORTES) : (`/${USUARIO_}/${props.userId}/` + LOGOUT);

                return (
                    <li key={i} className={props.classMenuItems} onClick={(e)=>handleClick(props, e)}>

                        {generarLink(props.userGuest, LinkOpt, props, opcion)}
                    </li>
                )
            })}
        </ul> 
    )
}

function handleClick(props, e) {
    
    // if(props.menuVisible !== 'aside'){
        const menuContainer = e.target.parentElement.parentElement.parentElement;
        menuContainer.classList.toggle(props.menuVisible);
    // }
}

function activeLink(isActive, props) {
    const clases = `${props.classNavLinkActive} ${props.classNavLink}`;
    return isActive ? clases : props.classNavLink;    
}