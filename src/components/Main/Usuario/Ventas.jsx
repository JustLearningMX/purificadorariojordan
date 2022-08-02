import { useState, useEffect, useCallback } from 'react';
import styles from '../../../css/usuarios/Ventas.module.css';
import { BarraDeBusqueda } from '../../../components/Main/Ventas/BarraDeBusqueda';
import { ProductosGrid } from '../../../components/Main/Ventas/ProductosGrid';
import { ResumenDeCompras } from '../Ventas/ResumenDeCompras';
import { CarritoDeCompras } from '../Ventas/CarritoDeCompras';

export function Ventas() {
    // const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    const [carrito, setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);

    const renderizarCarrito = useCallback(()=>{
        const carritoSinDuplicados = [...new Set(carrito)];

        const listaProductos = carritoSinDuplicados.map((item)=>{
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = arrayDeProductos.filter((producto) => {
                // ¿Coincide las id? Solo puede existir un caso
                return producto.id === parseInt(item);
            });

            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
                return itemId === item ? total += 1 : total;
            }, 0);

            return ([miItem, numeroUnidadesItem])
        });

        setProductos(listaProductos);

    }, [carrito]);

    useEffect(()=>{
            renderizarCarrito();
    }, [carrito, renderizarCarrito]);

    return (
        <section className={styles.puntoDeVentaContainer}>
            <section className={`${styles.searchContainer} ${styles.containersVentas}`}>
                <BarraDeBusqueda />
            </section>
            <section className={`${styles.listaDeProductosContainer} ${styles.containersVentas}`}>
                <ProductosGrid arrayDeProductos={arrayDeProductos} carrito={carrito} setCarrito={setCarrito} />
            </section>
            <section className={`${styles.resumenDeComprasContainer} ${styles.containersVentas}`}> {/* styles.carritoDeComprasContainer */}
                <ResumenDeCompras productos={productos} />
            </section>
            <section className={`${styles.carritoDeComprasContainer} ${styles.containersVentas}`}>  {/* styles.listaDeComprasContainer */}
                <CarritoDeCompras productos={productos} carrito={carrito} setCarrito={setCarrito} />
            </section>
        </section>
    );
}

const arrayDeProductos = [
    {
        id: 1,
        nombre: 'Garrafón',
        medida: 'litros',
        cantidad: 20,
        precio: 18,
    },
    {
        id: 2,
        nombre: 'Galón',
        medida: 'litros',
        cantidad: 4,
        precio: 5,
    },
    {
        id: 3,
        nombre: 'Litro',
        medida: 'litros',
        cantidad: 1,
        precio: 1.5,
    }
];