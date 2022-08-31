import { useState, useEffect, useCallback } from 'react';
import styles from '../../../css/usuarios/Ventas.module.css';
import { BarraDeBusqueda } from '../../../components/Main/Ventas/BarraDeBusqueda';
import { ProductosGrid } from '../../../components/Main/Ventas/ProductosGrid';
import { ResumenDeCompras } from '../Ventas/ResumenDeCompras';
import { CarritoDeCompras } from '../Ventas/CarritoDeCompras';
import { getProductos } from '../../../data/peticionesMongo/getProductos';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';

export function Ventas() {    
    const [carrito, setCarrito] = useState([]); //Array con los ID de los productos elegidos
    const [productos, setProductos] = useState([]); //Array de arrays con productos y cantidades
    const [productosBD, setProductosBD] = useState(null); //Todos los productos de la BD
    const [telefonoCliente, setTelefonoCliente] = useState(null); //Usuario que va a comprar
    const [cantidadBD, setCantidadBD] = useState(0); //Cantidad actual de garrafones que tiene el cliente en la BD
    const [listaInventario, setListaInventario] = useState(null); //El inventario de los clientes de la BD
    const [users, setUsers] = useState(null) //Todos los usuarios a mostrar en el buscador
    const [valueCliente, setValueCliente] = useState(''); //Cliente elegido en la barra de busqueda

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));    

    const fetchData = useCallback( async ()=>{
        const data = await getProductos(userToken.token);
        if(data.error){
            console.log('Error al descargar la lista de productos...');
          } else {  
            setProductosBD(data.productos);
          }
    }, [userToken.token]);

    useEffect(()=>{
        if(!productosBD){
            fetchData();
        }
    }, [productosBD, fetchData]);

    const renderizarCarrito = useCallback(()=>{
        
        const carritoSinDuplicados = [...new Set(carrito)];

        const listaProductos = carritoSinDuplicados.map((item)=>{
            // Obtenemos el item que necesitamos de la variable base de datos
            
            const miItem = productosBD.filter((producto) => {
                // ¿Coincide las id? Solo puede existir un caso
                return producto.id === item;
            });

            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
                return itemId === item ? total += 1 : total;
            }, 0);

            return ([miItem, numeroUnidadesItem])
        });
        setProductos(listaProductos);

    }, [carrito, productosBD]);

    useEffect(()=>{
            renderizarCarrito();
    }, [carrito, renderizarCarrito, productosBD]);

    const seccion = productosBD ? <ProductosGrid arrayDeProductos={productosBD} carrito={carrito} setCarrito={setCarrito} /> : <Spinner className={spinner.spinner} />;

    return (
        <section className={styles.puntoDeVentaContainer}>
            <section className={`${styles.searchContainer} ${styles.containersVentas}`}>
                <BarraDeBusqueda 
                    token={userToken.token} 
                    setTelefonoCliente={setTelefonoCliente} 
                    setCantidadBD={setCantidadBD} 
                    setListaInventario={setListaInventario}
                    listaInventario={listaInventario}
                    setUsers={setUsers}
                    users={users}
                    setValueCliente={setValueCliente}
                    valueCliente={valueCliente}
                />
            </section>
            <section className={`${styles.listaDeProductosContainer} ${styles.containersVentas}`}>
                {seccion}
            </section>
            <section className={`${styles.resumenDeComprasContainer} ${styles.containersVentas}`}>
                <ResumenDeCompras 
                    productos={productos} 
                    setProductos={setProductos} 
                    telefonoCliente={telefonoCliente} 
                    cantidadBD={cantidadBD} 
                    setUsers={setUsers}
                    setValueCliente={setValueCliente}
                    setCantidadBD={setCantidadBD} 
                />
            </section>
            <section className={`${styles.carritoDeComprasContainer} ${styles.containersVentas}`}> 
                <CarritoDeCompras 
                    productos={productos} 
                    carrito={carrito} 
                    setCarrito={setCarrito}
                />
            </section>
        </section>
    );
}