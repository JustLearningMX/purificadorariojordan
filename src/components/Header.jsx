import { Navbar } from "./Header/Navbar";
import { AccountCircle } from '@styled-icons/material';
import { Menu } from '@styled-icons/material';

import img from '../assets/logo-principal.png';
import styles from '../css/Header.module.css';
import stylesIcons from '../css/varios/Icons.module.css';
import stylesAside from '../css/Aside.module.css';
import { MenuUser } from "./Header/MenuUser";

export function Header() {
    return (
        <header className={styles.header} >
            <figure className={styles.logo_container} >                            
                <img src={img} alt="Logo purificadora rio jordan" className={styles.logo_principal} />
            </figure>
            <figure className={`${styles.userMenu_icon_container}`} >
                <AccountCircle onClick={()=>handleClick('menuUser')} className={stylesIcons.icono} />
            </figure>
            <figure className={`${styles.mainMenu_icon_container}`} >
                <Menu onClick={()=>handleClick('menuMain')} className={stylesIcons.icono} />
            </figure>
            <Navbar 
                classContainer={styles.mainMenu_container} 
                classMenuItems={styles.menu_items} 
                classNavLink={styles.nav_link}
                classNavLinkActive={styles.nav_link_active}
                menu_visible={styles.nav_menu_visible}
            />
            <MenuUser 
                classContainer={styles.userMenu_container} 
                classMenuItems={styles.menu_items} 
                classNavLink={styles.nav_link} 
                classNavLinkActive={styles.nav_link_active}
                menu_visible={styles.nav_menu_visible}
            />
        </header>
    );
}

function handleClick(boton) {
    const menuMain =  document.querySelector(`nav`);
    const userMain =  document.getElementsByClassName(`${styles.userMenu_container}`);
    const menuElegido = (boton === 'menuMain') ? userMain[0] : menuMain;
    const esVisible = menuElegido.classList.contains(`${styles.nav_menu_visible}`);

    if(boton === 'menuMain') {

        menuMain.classList.toggle(`${styles.nav_menu_visible}`);

        if(esVisible)
            userMain[0].classList.toggle(`${styles.nav_menu_visible}`);
        
    }

    if(boton === 'menuUser') {

        const root =  document.querySelector(`#root`);
        const aside =  document.querySelector(`aside`);

        root.classList.toggle(`${stylesAside.only_main}`);
        aside.classList.toggle(`${stylesAside.aside_no_visible}`);

        userMain[0].classList.toggle(`${styles.nav_menu_visible}`);

        if(esVisible)
            menuMain.classList.toggle(`${styles.nav_menu_visible}`);

    }

}