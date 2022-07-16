import { Navbar } from "./Header/Navbar";
import { Icono } from "./Icono";
import { AccountCircle } from '@styled-icons/material';
import { Menu } from '@styled-icons/material';

import img from '../assets/logo-principal.png';
import styles from '../css/Header.module.css';

export function Header() {
    return (
        <header className={styles.header} >
            <figure className={styles.logo_container} style={{height: '80px'}}>                            
                <img src={img} alt="Logo purificadora rio jordan" className={styles.logo_principal} />
            </figure>
            <figure className={`${styles.userMenu_container}`} >
                <Icono icon={AccountCircle} height='50%' width='70%' cursor={true} function={()=>handleClick('Menu User')} />
            </figure>
            <figure className={`${styles.mainMenu_icon_container}`} >
                <Icono icon={Menu} height='50%' width='70%' cursor={true} function={()=>handleClick('Menu Main')} />
            </figure>
            <Navbar className={styles.mainMenu_container} />
        </header>
    );
}

function handleClick(boton) {
    console.log('Diste click al botón ', boton);
}