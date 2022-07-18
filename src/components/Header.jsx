import { Navbar } from "./Header/Navbar";
import { Icono } from "./Icono";
import { AccountCircle } from '@styled-icons/material';
import { Menu } from '@styled-icons/material';

import img from '../assets/logo-principal.png';
import styles from '../css/Header.module.css';
import { MenuUser } from "./Header/MenuUser";

export function Header() {
    return (
        <header className={styles.header} >
            <figure className={styles.logo_container} style={{height: '80px'}}>                            
                <img src={img} alt="Logo purificadora rio jordan" className={styles.logo_principal} />
            </figure>
            <figure className={`${styles.userMenu_icon_container}`} >
                <Icono icon={AccountCircle} height='50%' width='auto' cursor={true} function={()=>handleClick('menuUser')} />
            </figure>
            <figure className={`${styles.mainMenu_icon_container}`} >
                <Icono icon={Menu} height='50%' width='auto' cursor={true} function={()=>handleClick('menuMain')} />
            </figure>
            <Navbar classContainer={styles.mainMenu_container} classMenuItems={styles.menu_items} classNavLink={styles.nav_link} />
            <MenuUser classContainer={styles.userMenu_container} classMenuItems={styles.menu_items} classNavLink={styles.nav_link} />
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

    if(boton === 'menuUser'){

        userMain[0].classList.toggle(`${styles.nav_menu_visible}`);

        if(esVisible)
            menuMain.classList.toggle(`${styles.nav_menu_visible}`);

    }

}