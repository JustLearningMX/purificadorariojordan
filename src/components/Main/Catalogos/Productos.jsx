import { useEffect, useState, useCallback } from 'react';
import { getProductos } from '../../../data/peticionesMongo/getProductos';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';
import { ProductoCard } from '../../../components/Main/Catalogos/ProductoCard';
import styles from '../../../css/usuarios/Catalogos.module.css';
import { green } from '@mui/material/colors';
import { Clear } from '@styled-icons/material';

export function Productos(){

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    const [productos, setProductos] = useState(null);

    const fetchData = useCallback( async ()=>{
        const data = await getProductos(userToken.token);
        if(data.error){
            console.log('Error al descargar la lista de productos...');
          } else {
            setProductos(data.productos);
          }
    }, [userToken.token]);

    useEffect(()=>{
        if(!productos){
            fetchData();
        }
    }, [productos, fetchData]);

    return !productos ? (
        <section className={styles.seccionSpinner}>
            <Spinner className={spinner.spinner} />
        </section>
    ) :
    (
        <section className={`${styles.listaDeProductosContainer}`}>            
            <article className={styles.contenedorBuscadorYagregar}>
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
        </section>
    );
}