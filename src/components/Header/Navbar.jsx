import { arrayMenu } from '../../data/arrayMenu.js';
import { Menu } from '../Menu.jsx';

export function Navbar(props) {
    return(
        <nav className={props.classContainer}>
            <Menu 
                opcionesMenu={arrayMenu.principal} 
                classMenuItems={props.classMenuItems} 
                classNavLink={props.classNavLink} 
            />
        </nav>
    );    
}