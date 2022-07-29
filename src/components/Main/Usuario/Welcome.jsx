import estilos from '../../../css/usuarios/Welcome.module.css';
import spinner from '../../../css/varios/Spinner.module.css';
import { Skeleton, Stack } from '@mui/material';

import { useState, useEffect, useCallback } from 'react';
import { Spinner } from '@styled-icons/evil';
import { getUsuario } from '../../../data/peticionesMongo/getUsuario';
import { localStorageObj } from '../../../data/localStorage';
import { crearUsuario } from '../../../utils/crearUsuario';

export function Welcome() {

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    const UsuarioPurificadora = JSON.parse(window.localStorage.getItem("UsuarioPurificadora"));

    const [ usuario, setUsuario ] = useState(UsuarioPurificadora);

    const fetchDataUser = useCallback( async ()=>{
        const data = await getUsuario(userToken.token);

        if(data.error) {
            const mensaje = data.servidor ? "Error en el servidor. Intente más tarde" : data.message + '. Usuario no encontrado.';                
            console.log(mensaje);
        } else {
            const Usuario = crearUsuario(data.user);
            
            //Guardamos al USUARIO y sus Datos en el localStorage
            localStorageObj['usuario'](Usuario);
            setUsuario(Usuario);
        }

    }, [userToken.token]);

    useEffect( ()=>{
        if(!usuario) {
            fetchDataUser();
        }
    }, [fetchDataUser, usuario]);

    if(!usuario) {
        return (
            <section className={estilos.seccionSpinner}>
                <Stack spacing={1} className={estilos.stackSkeletons}>
                    <Skeleton variant="text" className={estilos.skeletonText}/>
                    <Skeleton variant="circular" className={estilos.skeletonAvatar}/> {/* width={40} height={40}  */}
                    <Skeleton variant="rectangular" className={estilos.skeletonRectangulo}/> {/* width={210} height={118}   */}
                </Stack>
                <Spinner className={spinner.spinner} />
            </section>
        )
    }

    return (
        <section className={estilos.seccionPrincipal} style={{height: "calc(100vh - 140px)"}}>
            <h2>Bienvenido {`${usuario.nombre} ${usuario.apellidos}`}</h2>

        </section>
    );
}