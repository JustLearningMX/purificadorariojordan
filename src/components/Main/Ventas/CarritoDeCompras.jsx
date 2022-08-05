// import { useEffect } from 'react';
import styles from '../../../css/usuarios/Ventas.module.css'

export function CarritoDeCompras({productos, carrito, setCarrito}){

    return ( <>
        <p className={`${styles.tituloCarrito}`}>Lista de compras</p>
        <ul className={styles.listaContainer}>
            {productos.map(([ [ {id, nombre, medida, cantidad, precio} ], total ])=>{
                return (
                    <li className={styles.listaItems} key={id}>
                        {total} x {nombre} de {cantidad} {medida} -- ${Number(precio.$numberDecimal).toFixed(2)}
                        <input                        
                            type="submit" 
                            className={`${styles.quitarProducto} ${styles.btnEnCarrito}`}
                            value='X' 
                            id={id}
                            onClick={()=> quitarItem(id, carrito, setCarrito)}
                        />
                    </li>
                )
            })}
        </ul>
    </>);
}

function quitarItem(id, carrito, setCarrito){
    
    // Borramos todos los productos
    const newCarrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    //Actualizamos el carrito con los productos restantes
    setCarrito(newCarrito);
}