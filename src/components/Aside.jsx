import styles from '../css/Aside.module.css';
import stylesIcons from '../css/varios/Icons.module.css';
import { MenuUser } from './Header/MenuUser';
import { MenuFold } from '@styled-icons/remix-fill';

export function Aside(){
    return (
        <aside className={styles.aside}>
            <figure className={`${styles.foldMenu_icon_container}`} >
                <MenuFold onClick={()=>handleClick()} className={stylesIcons.icono} />
            </figure>            
            <MenuUser 
                classContainer={styles.userMenu_container} 
                classMenuItems={styles.menu_items} 
                classNavLink={styles.nav_link} 
                classNavLinkActive={styles.nav_link_active}
                menu_visible='aside'
            />
        </aside>
    );
}

function handleClick() {
        const root =  document.querySelector(`#root`);
        const aside =  document.querySelector(`aside`);

        root.classList.toggle(`${styles.only_main}`);
        aside.classList.toggle(`${styles.aside_no_visible}`);
}