import { arrayMenu } from '../../data/arrayMenu.js';
import { Menu } from '../Menu.jsx';
import { useAuthContext } from '../../hooks/useAuthContext';

export function MenuUser(props) {
    const { isAuthenticated } = useAuthContext();
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    
    const userId = userToken ? userToken.id : 0;

    const opcionesMenu = !isAuthenticated ? arrayMenu.userGuest :
        (isAuthenticated && !userToken.admin && !userToken.empleado) ? arrayMenu.userCliente :
        (isAuthenticated && !userToken.admin) ? arrayMenu.userEmpleado : 
        (isAuthenticated && userToken.admin) ? arrayMenu.userAdmin : null;

    const isUserGuest = !isAuthenticated ? true : false;

    return(
        <section className={props.classContainer}>
            <Menu 
                opcionesMenu={opcionesMenu} //Opciones del menu
                classMenuItems={props.classMenuItems}  //Clase para los items del menu
                classNavLink={props.classNavLink} //Clase para los links
                classNavLinkActive={props.classNavLinkActive} //Clase para cuando un link está activo
                menu={props.menu} //Opciones del menú
                menuVisible={props.menu_visible} //Si se muestra u oculta el menú
                userGuest={isUserGuest}
                userId={userId}          
            />
        </section>
    );    
}