import styles from '../../../css/usuarios/Ventas.module.css'
import { ProductoCard } from './ProductoCard';

export function ProductosGrid({arrayDeProductos, carrito, setCarrito}){
    return (
        <ul className={styles.productosContainer}>
            {arrayDeProductos.map((producto)=>{
                return <ProductoCard 
                            producto={producto} 
                            key={producto.id} 
                            carrito={carrito} 
                            setCarrito={setCarrito}
                        />
            })}
        </ul>
    );
}