import { NavLink} from 'react-router-dom';
import { NOSOTROS, SERVICIOS, CONTACTO, SIGNUP, LOGIN} from '../config/router/paths.js';

export function Menu(props){

    return (
        <ul>
            {props.opcionesMenu.map((opcion, i)=>{
                const COMPONENTE = 
                    (opcion === 'Nosotros') ? NOSOTROS : 
                    (opcion === 'Servicios') ? SERVICIOS :
                    (opcion === 'Contacto') ? CONTACTO :
                    (opcion === 'Login') ? LOGIN : SIGNUP;

                return <li key={i} className={props.classMenuItems} onClick={(e)=>handleClick(props, e)}>
                    <NavLink to={COMPONENTE} className={({isActive}) => activeLink(isActive, props)}  exact>
                        {opcion}
                    </NavLink>
                </li>
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