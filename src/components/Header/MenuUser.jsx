import { arrayMenu } from '../../data/arrayMenu.js';
import { Menu } from '../Menu.jsx';

export function MenuUser(props) {
    return(
        <section className={props.classContainer}>
            <Menu 
                opcionesMenu={arrayMenu.userGuest} 
                classMenuItems={props.classMenuItems} 
                classNavLink={props.classNavLink} 
            />
        </section>
    );    
}