/**COMPONENTE QUE DIBUJA TODOS LOS DATOS DE UNA VENTA EN LA SECCION: REPORTES/VENTAS */
import { useState, useEffect } from 'react';
import { fechaCorta, hora } from '../../../utils/formateadorDeFechas';
import styles from '../../../css/usuarios/reportes/Ventas.module.css';

export function VentaCompleta({venta}) {

    //Para guardar fecha y hora de la venta
    const [ fechaVenta, setFechaVenta ] = useState(null);
    const [ horaVenta, setHoraVenta ] = useState(null);
    const [ resumenCuentas, setResumenCuentas] = useState(null);

    useEffect( ()=> {
        let subtotal = 0, descuento = 0, total = 0;
        const existeDescuento = (venta.llenadoGratis && venta.llenadoGratis.length > 0) ? true : false;
        const llenadoGratis = (venta.llenadoGratis && venta.llenadoGratis.length > 0) ? venta.llenadoGratis[0].cantidad : 0;
        
        if(venta.createdAt) {
            const fecha = new Date(venta.createdAt);
            const diaDeLaTransaccion = fechaCorta(fecha);
            const horaDeLaTransaccion = hora(fecha);
            setFechaVenta(diaDeLaTransaccion);
            setHoraVenta(horaDeLaTransaccion);
        }

        if(venta) {
            
            venta.Productos.map( producto => {
                if(existeDescuento && producto.id_producto === "62f2a17281de05ae2869feab") {
                    descuento = descuento + (Number(producto.precio.$numberDecimal)*llenadoGratis);
                }                

                subtotal = subtotal + (Number(producto.precio.$numberDecimal)*Number(producto.cantidad));                
                total = total + (subtotal-descuento);
                return null;
            })

            setResumenCuentas({subtotal, descuento, total});
        }
    },[venta]);

    return (fechaVenta && horaVenta && resumenCuentas) ? (
        <li className={styles.contenedorVentaReporte}>
            
            <div>
                <div className={styles.contenedorDatos}>                                        
                    <p>
                        <span className={styles.labelData}>Fecha:</span>
                        <span className={styles.inputData}> {fechaVenta} {horaVenta}</span>
                    </p>
                </div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Venta:</span>
                        <span className={styles.inputData}> {venta.id_venta}</span>
                    </p> 
                </div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Sucursal:</span>
                        <span className={styles.inputData}> {venta.Sucursal[0].nombre}</span>
                    </p>
                </div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Atendio:</span>
                        <span className={styles.inputData}> {venta.Empleado[0].nombre} {venta.Empleado[0].apellidos}</span>
                    </p>
                </div>
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Cliente:</span>
                        <span className={styles.inputData}> {venta.Cliente[0].nombre} {venta.Cliente[0].apellidos}</span>
                    </p>
                </div>                
                <div className={styles.contenedorDatos}>
                    <p>
                        <span className={styles.labelData}>Telefono:</span>
                        <span className={styles.inputData}> {venta.Cliente[0].telefono}</span>
                    </p>
                </div>
            </div>

            <div>
                <h1 className={styles.headProducts}>Productos</h1>
                <ul>
                    { venta.Productos.map( producto => {
                        const precio = Number(producto.precio.$numberDecimal).toFixed(2);
                        const cantidad = Number(producto.cantidad);                        

                        return <li key={producto.id_producto} className={styles.itemProducto}>                            
                            <p>
                                {cantidad} {producto.nombre} {producto.capacidad} {producto.medida} ${precio} ${(precio*cantidad).toFixed(2)}
                            </p>
                        </li>
                    })}
                </ul>
            </div>

            <div >
                <h1 className={styles.headProducts}>Resumen</h1>
                <div className={styles.contenedorResumen}>
                    <div className={styles.contenedorDatos}>
                        <p>
                            <span className={styles.labelData}>Subtotal:</span>
                            <span className={styles.inputData}> ${resumenCuentas.subtotal.toFixed(2)}</span>
                        </p>
                    </div>
                    <div className={styles.contenedorDatos}>
                        <p>
                            <span className={styles.labelData}>Descuento:</span>
                            <span className={styles.inputData}> ${resumenCuentas.descuento.toFixed(2)}</span>
                        </p>
                    </div>
                    <div className={styles.contenedorDatos}>
                        <p>
                            <span className={styles.labelData}>Total:</span>
                            <span className={styles.inputData}> ${resumenCuentas.total.toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    ) : null;
}