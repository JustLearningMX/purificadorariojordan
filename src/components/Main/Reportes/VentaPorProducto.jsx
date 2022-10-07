import styles from '../../../css/usuarios/reportes/Ventas.module.css';
import stylesVentasPorCliente from '../../../css/usuarios/reportes/Clientes.module.css';
import { fechaCorta, hora } from '../../../utils/formateadorDeFechas';

export function VentaPorProducto( {ventaPorProducto} ) {

    const { nombre, capacidad, medida, Ventas } = ventaPorProducto;

    return (
        <li className={styles.contenedorVentaReporte}>
            <div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Producto:</span>
                        <span className={styles.inputData}> {nombre} de {capacidad} {medida}</span>
                    </p>
                </div>
                <div>
                    <h1 className={styles.headProducts}>{`Ventas del producto: ${Ventas.length}`}</h1>
                    <ul>
                        { Ventas.map( venta => {

                            const { id_venta, createdAt, cantidad_producto, Empleado, Sucursal, llenadoGratis } = venta; 
                            const fecha = new Date(createdAt);
                            const diaDeLaTransaccion = fechaCorta(fecha);
                            const horaDeLaTransaccion = hora(fecha);
                            const precio = Number(venta.precio.$numberDecimal).toFixed(2);

                            return(
                                <li key={id_venta} className={`${styles.itemProducto} ${stylesVentasPorCliente.contenedorDatosProductos}`}>
                                    <div className={styles.contenedorDatos}>
                                        <p>
                                            <span className={styles.labelData}>Fecha:</span>
                                            <span className={styles.inputData}> {diaDeLaTransaccion} {horaDeLaTransaccion} </span>
                                        </p>
                                    </div>
                                    <div className={styles.contenedorDatos}>
                                        <p>
                                            <span className={styles.labelData}>Sucursal:</span>
                                            <span className={styles.inputData}> {Sucursal[0].nombre} </span>
                                        </p>
                                    </div>
                                    <div className={styles.contenedorDatos}>
                                        <p>
                                            <span className={styles.labelData}>Atendio:</span>
                                            <span className={styles.inputData}> {Empleado[0].nombre} {Empleado[0].apellidos}</span>
                                        </p>
                                    </div>
                                    <div className={styles.contenedorDatos}>
                                        <p>
                                            <span className={styles.labelData}>Cantidad vendida:</span>
                                            <span className={styles.inputData}> {cantidad_producto}</span>
                                        </p>
                                    </div>
                                    
                                    <div className={styles.contenedorDatos}>
                                        <p>
                                            <span className={styles.labelData}>Precio:</span>
                                            <span className={styles.inputData}> {precio}</span>
                                        </p>
                                    </div>
                                    <div className={styles.contenedorDatos}>
                                        <p>
                                            <span className={styles.labelData}>Llenados gratis:</span>
                                            <span className={styles.inputData}> {llenadoGratis.length > 0 ? llenadoGratis[0].cantidad : 0}</span>
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </li>
    );
}