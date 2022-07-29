import { useState, useEffect } from "react";
import { Dialogs } from '../../Varios/Dialogs';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Done } from '@styled-icons/material';
import { Clear } from '@styled-icons/material';

import { useAuthContext } from '../../../hooks/useAuthContext'
import { Navigate } from 'react-router-dom';
import { USUARIOS, LOGIN } from '../../../config/router/paths';

const arrayBotones = [
    {nombre: 'Si', color: blue, icon: <Done />}, 
    {nombre: 'No', color: red, icon: <Clear />}
];

export function Logout() {

    const { isAuthenticated, logout } = useAuthContext();
    
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);
    const [selectedValue, setSelectedValue] = useState('No');

    useEffect( ()=>{
        if(selectedValue === "Si") {
            logout();
        }
    }, [selectedValue, logout, isAuthenticated]);

    const handleClose = (value) => {
        setOpen(false);
        value === "Si" ? setSelectedValue(value) : navigate(-1);
    }

    if(!isAuthenticated) {
        return <Navigate to={(USUARIOS + LOGIN)} />
    }

    return (
        <section style={{height: "calc(100vh - 110px)"}}>
            <Dialogs 
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                botones={arrayBotones}
                titulo='¿Desea cerrar la sesión?'
                display='flex'
            />
        </section>
    );
    
}