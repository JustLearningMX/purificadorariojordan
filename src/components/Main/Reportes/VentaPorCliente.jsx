import styles from '../../../css/usuarios/reportes/Ventas.module.css';
import stylesVentasPorCliente from '../../../css/usuarios/reportes/Clientes.module.css';
import { fechaCorta, hora } from '../../../utils/formateadorDeFechas';

export function VentaPorCliente( {ventaPorCliente}) {

    const { nombre, apellidos, telefono, Ventas } = ventaPorCliente;

    return (
        <li className={styles.contenedorVentaReporte}>
            <div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Cliente:</span>
                        <span className={styles.inputData}> {nombre} {apellidos}</span>
                    </p>
                </div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Telefono:</span>
                        <span className={styles.inputData}> {telefono}</span>
                    </p>
                </div>
                <div>
                    <h1 className={styles.headProducts}>{`Compras del cliente: ${Ventas.length}`}</h1>
                    <ul>
                    { Ventas.map( venta => {
                        const { id_venta, createdAt, Empleado, Sucursal, Productos, llenadoGratis } = venta;  
                        
                        const fecha = new Date(createdAt);
                        const diaDeLaTransaccion = fechaCorta(fecha);
                        const horaDeLaTransaccion = hora(fecha);
                        let subtotal=0, descuento=0, total=0;

                        return (
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
                                <div className={`${styles.contenedorDatos} ${stylesVentasPorCliente.labelDataProductos}`}>
                                    <p>
                                        <span className={`${styles.labelData} `}>Productos:</span>
                                    </p>
                                </div>
                                <div className={`${styles.contenedorDatos} ${stylesVentasPorCliente.contenedorDatosRegistro}`}>
                                    <ul>
                                        {Productos.map( producto => {
                                            const { nombre, capacidad, medida, cantidad, id_producto } = producto;
                                            const precio = Number(producto.precio.$numberDecimal).toFixed(2);
                                            subtotal = subtotal + (cantidad * precio);
                                            descuento = ((id_producto === '62f2a17281de05ae2869feab') && (llenadoGratis && llenadoGratis.length > 0)) ?
                                                descuento + (llenadoGratis[0].cantidad * precio) : descuento;
                                            total = subtotal - descuento;

                                            return (
                                                <li key={id_producto} className={styles.itemProducto}>
                                                    <p>
                                                        {cantidad} {nombre} {capacidad} {medida} ${precio} ${(precio*cantidad).toFixed(2)}
                                                    </p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className={`${styles.contenedorDatos} ${stylesVentasPorCliente.labelDataProductos}`}>
                                    <p>
                                        <span className={`${styles.labelData} `}>Resumen:</span>
                                    </p>
                                </div>
                                <div className={`${styles.contenedorResumen} ${stylesVentasPorCliente.contenedorResumenClientes}`}>
                                    <div className={`${styles.contenedorDatos} ${stylesVentasPorCliente.contenedorDatosCliente}`}>
                                        <p>
                                            <span className={styles.labelData}>Subtotal:</span>
                                            <span className={styles.inputData}> ${subtotal.toFixed(2)}</span>
                                        </p>
                                    </div>
                                    <div className={`${styles.contenedorDatos} ${stylesVentasPorCliente.contenedorDatosCliente}`}>
                                        <p>
                                            <span className={styles.labelData}>Descuento:</span>
                                            <span className={styles.inputData}> ${descuento.toFixed(2)}</span>
                                        </p>
                                    </div>
                                    <div className={`${styles.contenedorDatos} ${stylesVentasPorCliente.contenedorDatosCliente}`}>
                                        <p>
                                            <span className={styles.labelData}>Total:</span>
                                            <span className={styles.inputData}> ${total.toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                </div>
            </div>
        </li>
    );
    
}