import { useEffect, useState, useCallback } from 'react';
import { getProductos } from '../../../data/peticionesMongo/getProductos';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';
import { ProductoCard } from '../../../components/Main/Catalogos/ProductoCard';
import styles from '../../../css/usuarios/Catalogos.module.css';
import { green } from '@mui/material/colors';
import { AddCircle } from '@styled-icons/material-sharp';
import { ModalForm } from '../../Varios/ModalForm';
import { Producto } from '../../../classes/Producto'
import { Clear } from '@styled-icons/material';
import { red } from '@mui/material/colors';

/**Botones para la ventana modal Crear */
const arrayBotones = [ 
    {nombre: 'Cancelar', color: red, icon: <Clear />}
];

export function Productos(){

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora")); //Token del usuario
    const [productos, setProductos] = useState(null); //Todos los productos
    const [newProduct] = useState(new Producto()); //Nuevo producto basado en la clase

    /**Opciones para la Modal Crear */
    const [open, setOpen] = useState(false);
    const [selectedValue] = useState('Cancelar');
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = (value) => {
        setOpen(false);
    }

    /**Trae todos los productos de la BD */
    const fetchData = useCallback( async ()=>{
        const data = await getProductos(userToken.token);
        if(data.error){
            console.log('Error al descargar la lista de productos...');
          } else {
            setProductos(data.productos);
          }
    }, [userToken.token]);

    /**Efecto para traer todos los items de la BD */
    useEffect(()=>{
        if(!productos){
            fetchData();
        }
    }, [productos, fetchData]);

    /**Crea un Producto vacio desde su clase */
    const handleAdd = ()=>{
        handleOpen();
    }

    //Si no hay productos muestra un spinner
    return !productos ? (
        <section className={styles.seccionSpinner}>
            <Spinner className={spinner.spinner} />
        </section>
    ) : //Ya hay productos descargados entonces pinta el componente
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
                {productos.map((producto)=>{
                    return <ProductoCard 
                                producto={producto} 
                                key={producto.id}
                                setProductos={setProductos}
                            />
                })}
            </ul>
            <ModalForm 
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                botones={arrayBotones}
                titulo='Agregue un producto.'
                display='flex'
                array={newProduct}
                peticion='crearProducto'
                setProductos={setProductos}
                opcionBtn='Crear'
                setOpen={setOpen}
            />
        </section>
    );
}