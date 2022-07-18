import styles from '../css/Aside.module.css';
import { MenuUser } from './Header/MenuUser';
import { Icono } from './Icono';
import { MenuFold } from '@styled-icons/remix-fill';

export function Aside(){
    return (
        <aside className={styles.aside}>
            <figure className={`${styles.foldMenu_icon_container}`} >
                <Icono icon={MenuFold} height='50%' width='auto' cursor={true} function={()=>handleClick('menuUser')} />
            </figure>            
            <MenuUser classContainer={styles.userMenu_container} classMenuItems={styles.menu_items} classNavLink={styles.nav_link} />
        </aside>
    );
}

function handleClick(boton) {
        const root =  document.querySelector(`#root`);
        const aside =  document.querySelector(`aside`);

        root.classList.toggle(`${styles.only_main}`);
        aside.classList.toggle(`${styles.aside_no_visible}`);
}