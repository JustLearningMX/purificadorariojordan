import styles from '../../../css/usuarios/Ventas.module.css';

export function ProductoCard({producto, carrito, setCarrito}){
    return (<li className={styles.itemProductos}>
            <div className={styles.divDatosContainer}>
                <p className={styles.nombreProducto}>
                    {producto.nombre}
                </p>
                <p className={styles.cantidadProducto}>
                    {`${producto.cantidad} ${producto.medida}`}
                </p>
                <p className={styles.precioProducto}>
                    {`$${Number(producto.precio.$numberDecimal).toFixed(2)}`}
                </p>
            </div>
            <div className={styles.divContarBotones}>
                <input 
                    type="submit" 
                    className={styles.agregarProducto} 
                    value='+' 
                    id={producto.id}
                    onClick={(e)=> anadirItem(e, producto, carrito, setCarrito)}
                />
            </div>
        </li>)
}

function anadirItem(e, producto, carrito, setCarrito) {
    carrito ? setCarrito([...carrito, producto.id]) : setCarrito([producto.id]);
}