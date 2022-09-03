import { useEffect, useState, useCallback } from 'react';
import { getSucursales } from '../../../data/peticionesMongo/getSucursales';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';
import { SucursalCard } from '../../../components/Main/Catalogos/SucursalCard';
import styles from '../../../css/usuarios/Catalogos.module.css';
import { green } from '@mui/material/colors';
import { AddCircle } from '@styled-icons/material-sharp';
import { ModalForm } from '../../Varios/ModalForm';
import { Sucursal } from '../../../classes/Sucursal'
import { Clear } from '@styled-icons/material';
import { red } from '@mui/material/colors';

/**Botones para la ventana modal Crear */
const arrayBotones = [ 
    {nombre: 'Cancelar', color: red, icon: <Clear />}
];

export function Sucursales(){

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora")); //Token del usuario
    const [sucursales, setSucursales] = useState(null); //Todas las sucursales
    const [newSucursal] = useState(new Sucursal()); //Nueva sucursal basado en la clase

    /**Opciones para la Modal Crear */
    const [open, setOpen] = useState(false);
    const [selectedValue] = useState('Cancelar');
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = (value) => {
        setOpen(false);
    }

    /**Trae todas los sucursales de la BD */
    const fetchData = useCallback( async ()=>{
        const data = await getSucursales(userToken.token);
        if(data.error){
            console.log('Error al descargar la lista de sucursales...');
          } else {
            setSucursales(data.sucursales);
          }
    }, [userToken.token]);

    /**Efecto para traer todos los items de la BD */
    useEffect(()=>{
        if(!sucursales){
            fetchData();
        }
    }, [sucursales, fetchData]);

    /**Crea una Sucursal vacia desde su clase */
    const handleAdd = ()=>{
        handleOpen();
    }

    //Si no hay sucursales muestra un spinner
    return !sucursales ? (
        <section className={styles.seccionSpinner}>
            <Spinner className={spinner.spinner} />
        </section>
    ) : //Ya hay sucursales descargados entonces pinta el componente
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
                {sucursales.map((sucursal)=>{
                    return <SucursalCard 
                                sucursal={sucursal} 
                                key={sucursal.id}
                                setSucursales={setSucursales}
                            />
                })}
            </ul>
            <ModalForm 
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                botones={arrayBotones}
                titulo='Agregue una sucursal.'
                display='flex'
                array={newSucursal}
                peticion='crearSucursal'
                setData={setSucursales}
                opcionBtn='Crear'
                setOpen={setOpen}
            />
        </section>
    );
}