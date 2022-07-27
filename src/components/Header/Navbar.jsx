/**COMPONENTE QUE DIBUJA LAS OPCIONES DEL MENÚ PRINCIPAL*/

import { arrayMenu } from '../../data/arrayMenu.js';
import { Menu } from '../Menu.jsx';

export function Navbar(props) {
    return(
        <nav className={props.classContainer}>
            <Menu 
                opcionesMenu={arrayMenu.principal}   //Opciones del menu
                classMenuItems={props.classMenuItems} //Clase para los items del menu
                classNavLink={props.classNavLink} //Clase para los links
                classNavLinkActive={props.classNavLinkActive} //Clase para cuando un link está activo
                menu={props.menu} //Opciones del menú
                menuVisible={props.menu_visible} //Si se muestra u oculta el menú
                userGuest={true}
            />
        </nav>
    );    
}