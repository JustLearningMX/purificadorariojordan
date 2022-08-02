import styles from '../../../css/usuarios/Ventas.module.css'
import { ProductoCard } from './ProductoCard';

export function ProductosGrid({arrayDeProductos, carrito, setCarrito}){
    return (
        <ul className={styles.productosContainer}>
            {arrayDeProductos.map((producto, key)=>{
                return <ProductoCard producto={producto} key={key} carrito={carrito} setCarrito={setCarrito}/>
            })}
        </ul>
    );
}