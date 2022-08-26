import { useState, useEffect, useCallback } from "react";
import { Dialogs } from '../../Varios/Dialogs';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Done } from '@styled-icons/material';
import { Clear } from '@styled-icons/material';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import { LoadingButton } from '@mui/lab';
import stylesDashboard from '../../../css/usuarios/Dashboard.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext'
import { Navigate } from 'react-router-dom';
import { USUARIOS, SIGNUP } from '../../../config/router/paths';
import { deleteUsuario } from '../../../data/peticionesMongo/deleteUsuario';

const arrayBotones = [
    {nombre: 'Si', color: blue, icon: <Done />}, 
    {nombre: 'No', color: red, icon: <Clear />}
];

export function DashEliminarCuenta() {

    const { isAuthenticated, logout } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No');

    const eliminarCuenta = useCallback( async ()=>{
        const user = JSON.parse(window.localStorage.getItem("UsuarioPurificadora"));
        const data = await deleteUsuario(user.id);

        if(data.error) {
            const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
            setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });                
            setIsLoading(false);
        } else {
            const mensaje = data.message + '. Puede volver a registrarse.';
            setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
            setTimeout(()=>{
                logout();
            },1300);
        }

    }, [dataSnackBar.countOpens, logout]);

    useEffect( ()=>{
        if(selectedValue === "Si") {
            setDataSnackBar({mensaje: "Eliminando su cuenta.", severity: "warning", countOpens: 1 });
            eliminarCuenta();
            setSelectedValue('No');
        }
    }, [selectedValue, eliminarCuenta]);

    const handleOpen = ()=>{
        setIsLoading(true);
        setOpen(true);
    }

    const handleClose = (value) => {
        setIsLoading(false);
        setOpen(false);
        if(value === "Si") setSelectedValue(value);
    }

    if(!isAuthenticated) {
        return <Navigate to={(USUARIOS + SIGNUP)} />
    }

    return (
        <section className={stylesDashboard.eliminarCuentaContainer}>
            <h1 className={stylesDashboard.eliminarCuenta_titulo}>
                Proceda con precaución. 
            </h1>
            <p className={stylesDashboard.eliminarCuenta_leyenda}>
                De click al botón si desea eliminar sus datos de nuestro sistema.
            </p>
            <LoadingButton 
                loading={isLoading}
                variant="contained" 
                type='submit'
                size="large"
                onClick={handleOpen}
                color="error"
            >
                Eliminar Cuenta
            </LoadingButton>
            <Dialogs 
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                botones={arrayBotones}
                titulo='¡ALERTA! Confirme que desea eliminar su cuenta.'
                display='flex'
            />
            {cargarSnackBar(dataSnackBar)}
        </section>
    );    
}

function cargarSnackBar({mensaje, severity, countOpens}){    
    if(countOpens > 0) {
        return <CustomizedSnackbars mensaje={mensaje} severity={severity} countOpens={countOpens} />
    }
}