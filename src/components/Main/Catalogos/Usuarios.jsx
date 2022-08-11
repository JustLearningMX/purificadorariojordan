import { useEffect, useState, useCallback } from 'react';
import { getUsuarios } from '../../../data/peticionesMongo/getUsuarios';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';
import { UsuarioCard } from '../../../components/Main/Catalogos/UsuarioCard';
import styles from '../../../css/usuarios/Catalogos.module.css';
import { green } from '@mui/material/colors';
import { AddCircle } from '@styled-icons/material-sharp';
import { ModalForm } from '../../Varios/ModalForm';
import { Usuario } from '../../../classes/Usuario'
import { Clear } from '@styled-icons/material';
import { red } from '@mui/material/colors';

/**Botones para la ventana modal Crear */
const arrayBotones = [ 
    {nombre: 'Cancelar', color: red, icon: <Clear />}
];

export function Usuarios({tipo_usuario}){

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora")); //Token del usuario
    const [usuarios, setUsuarios] = useState(null); //Todos los usuarios
    const [newUsuario] = useState(new Usuario()); //Nuevo usuario basado en la clase

    /**Opciones para la Modal Crear */
    const [open, setOpen] = useState(false);
    const [selectedValue] = useState('Cancelar');
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = (value) => {
        setOpen(false);
    }

    /**Trae todos los usuarios de la BD */
    const fetchData = useCallback( async ()=>{
        const data = await getUsuarios(userToken.token);
        
        if(data.error){
            console.log('Error al descargar la lista de usuarios...');
          } else {
            const users = data.usuarios.filter((usuario)=>{

                if(tipo_usuario === 'cliente') {
                    return usuario.tipo === tipo_usuario;
                } else {
                    return usuario.tipo === 'admin' || usuario.tipo === 'empleado';
                }
                
            });
            setUsuarios(users);
          }
    }, [userToken.token, tipo_usuario]);

    /**Efecto para traer todos los items de la BD */
    useEffect(()=>{
        if(!usuarios){
            fetchData();
        }
    }, [usuarios, fetchData]);

    /**Crea un Usuario vacio desde su clase */
    const handleAdd = ()=>{
        handleOpen();
    }

    //Si no hay usuarios muestra un spinner
    return !usuarios ? (
        <section className={styles.seccionSpinner}>
            <Spinner className={spinner.spinner} />
        </section>
    ) : //Ya hay usuarios descargados entonces pinta el componente
    (
        <section className={`${styles.listaDeProductosContainer}`}>            
            <article className={styles.contenedorBuscadorYagregar}>
                <figure className={`${styles.addIconContainer}`}>
                    <AddCircle 
                        className={`${styles.addIcon}`} 
                        style={{ bgcolor: green[100], color: green[600] }}
                        onClick={handleAdd}
                    />
                </figure>
            </article>
            <ul className={styles.productosContainer}>
                {usuarios.map((usuario)=>{
                    return <UsuarioCard 
                                usuario={usuario} 
                                key={usuario.id}
                                setUsuarios={setUsuarios}
                            />
                })}
            </ul>
            <ModalForm 
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                botones={arrayBotones}
                titulo='Agregue un usuario.'
                display='flex'
                array={newUsuario}
                peticion='signupUsuario'
                setData={setUsuarios}
                opcionBtn='Crear'
                setOpen={setOpen}
            />
        </section>
    );
}