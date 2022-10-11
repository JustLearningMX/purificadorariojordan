import estilos from '../../../css/usuarios/Welcome.module.css';
import spinner from '../../../css/varios/Spinner.module.css';
import { Skeleton, Stack } from '@mui/material';

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@styled-icons/evil';
import { getUsuario } from '../../../data/peticionesMongo/getUsuario';
import { localStorageObj } from '../../../data/localStorage';
import { crearUsuario } from '../../../utils/crearUsuario';
import { EMPRESA, VENTAS, DASHBOARD, USUARIO_ } from '../../../config/router/paths';
import { useAuthContext } from '../../../hooks/useAuthContext';

export function Welcome() {

    const { setUsuario: setUsers } = useAuthContext();

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    const UsuarioPurificadora = JSON.parse(window.localStorage.getItem("UsuarioPurificadora"));

    const [ usuario, setUsuario ] = useState(UsuarioPurificadora);

    let navigate = useNavigate();

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
            setUsers(JSON.stringify(Usuario));
        }

    }, [userToken.token, setUsers]);

    

    const redireccionarUsuario = useCallback(()=> {        

        //Una vez que se han traído los datos del usuario, se valida si es de la empresa o cliente
        usuario && (userToken.admin || userToken.empleado) ? 
        navigate(`${EMPRESA}${VENTAS}`, { replace: true }) : 
        navigate((`/${USUARIO_}/${usuario.id}/` + DASHBOARD), { replace: true });

    }, [navigate, userToken.admin, userToken.empleado, usuario]);

    useEffect( ()=>{

        !usuario ? fetchDataUser() : redireccionarUsuario();

    }, [fetchDataUser, usuario, redireccionarUsuario]);

    //Si el usuario aún no se crea, se muestra una ventana de espera
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
}