import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import stylesBarraBusqueda from '../../../css/usuarios/Ventas.module.css';
import styles from '../../../css/usuarios/ReportesClientes.module.css';
import { BarraBusquedaReportes } from './BarraBusquedaReportes';
import { removeTime } from '../../../utils/formateadorDeFechas';
import { VentaPorProducto } from './VentaPorProducto';

export function ReporteProductos() {

    //Estados que vienen de Reportes.jsx
    const {
        todasLasVentas, //Array de las ventas
        fechaIni, //Fecha inicial del periodo
        fechaFin, //Fecha final del periodo
        setLeyendaReportes,
        setDatosReporte, //Para generar el archivo del reporte, ya sea excel o pdf
        setDatoBarraDeBusqueda,
        datoBarraDeBusqueda
    } = useOutletContext();
    
    //Estados del componente
    const [mensaje, setMensaje] = useState(null); //Ventas ordenadas por productos
    const [ ventasFiltradas, setVentasFiltradas ] = useState(null); //Ventas  ordenadas por productos y filtradas por fecha/producto

    //Tomamos todas las ventas y se ordenan por Cliente -> Ventas
    const ordenarPorProductos = useCallback((arrayDeVentas)=>{

        setLeyendaReportes('Ventas ordenadas por productos');

        // Array vacio para guardar el nuevo arreglo
        let ventasOrdenadasPorProductos = [];

        //Mapeo de todas las ventas
        arrayDeVentas.map( (venta) => {

            const { createdAt, id_venta, Cliente, Empleado, Sucursal, llenadoGratis, Productos } = venta;
            
            //Objeto vacio para guardar un nuevo Producto
            let nuevoProducto = {};
            //Objeto vacio para guardar una venta modificada
            let ventaModificada = {};

            //Verificamos que si ya existe un producto en el nuevo array
            Productos.map( producto => {
                const { id_producto, nombre, medida, capacidad, cantidad: cantidad_producto, precio } = producto;

                ventaModificada = {
                    cantidad_producto,
                    precio,
                    id_venta,
                    createdAt,
                    Cliente,
                    Empleado,
                    Sucursal,
                    llenadoGratis
                };

                const productoEncontrado = ventasOrdenadasPorProductos.filter( ventaOrdenada => ventaOrdenada.id_producto === id_producto);

                //No existe el producto o devolvio un array vacio
                if(!productoEncontrado || productoEncontrado.length < 1) {
                    nuevoProducto = {
                        id_producto,
                        nombre,
                        medida,
                        capacidad,
                        Ventas: [ { ...ventaModificada } ]
                    }
                    
                    //Lo agregamos al nuevo array
                    ventasOrdenadasPorProductos.push(nuevoProducto);

                    return null;
                } 
                else { //Ya existe, guardamos la venta en el Producto encontrado en el nuevo arreglo
                    if(productoEncontrado.length > 0) productoEncontrado[0].Ventas.push(ventaModificada);

                    return null;
                }
            });
            
            return null;
        });

        if(datoBarraDeBusqueda && datoBarraDeBusqueda.identificador){
            const ventasOrdenadasPorProductoYId = ventasOrdenadasPorProductos.filter( venta => venta.id_producto === datoBarraDeBusqueda.identificador)
            if(ventasOrdenadasPorProductoYId.length > 0) {
                setVentasFiltradas(ventasOrdenadasPorProductoYId); //Guardamos las ventas ya filtradas
                setDatosReporte(ventasOrdenadasPorProductoYId);
                setLeyendaReportes(`Total de productos: ${ventasOrdenadasPorProductoYId.length}`);
            } else {
                setVentasFiltradas(null);
                setDatosReporte(null);
                setMensaje(`El producto ${datoBarraDeBusqueda.nombre} no tiene ventas en ese periodo.`)
            }
        } else {
            setVentasFiltradas(ventasOrdenadasPorProductos); //Guardamos las ventas ya filtradas
            setDatosReporte(ventasOrdenadasPorProductos);
            setLeyendaReportes(`Total de productos: ${ventasOrdenadasPorProductos.length}`);
        }

    },[setLeyendaReportes, datoBarraDeBusqueda, setDatosReporte]);

    //Cambios en los estados
    useEffect( ()=> {

        setDatosReporte(null);

        //Para verificar si existe un periodo de fechas valido
        const fechaIniEpoch = fechaIni ? fechaIni.getTime() : 0;
        const fechaFinEpoch = fechaFin ? fechaFin.getTime() : 0;
        
        // Si existe o no un periodo valido
        if( (fechaIniEpoch > fechaFinEpoch) ) {
            setMensaje(`Ingrese un periodo de fechas valido.`);
            setLeyendaReportes('Ventas ordenadas por productos');
            setVentasFiltradas(null);
            setDatosReporte(null);
        } else if (fechaIni && fechaFin) { 
            //Filtramos las ventas
            const nuevasVentas = todasLasVentas.data.filter( venta => {
                const fechaVenta = removeTime(new Date(venta.createdAt)); //Remover horas, segundos, etc.
            
                return (fechaVenta.getTime() >= fechaIniEpoch && fechaVenta.getTime() <= fechaFinEpoch );
            })
            
            if(nuevasVentas && nuevasVentas.length > 0) {
                ordenarPorProductos(nuevasVentas);
            } else {
                setMensaje(`Sin ventas en ese periodo`);
                setLeyendaReportes('Ventas ordenadas por productos');
                setVentasFiltradas(null);
                setDatosReporte(null);
            }
        } else {
            ordenarPorProductos(todasLasVentas.data);
        }

    },[ordenarPorProductos, setLeyendaReportes, fechaIni, fechaFin, todasLasVentas, setDatosReporte]);

    return ventasFiltradas ? (
        <section className={styles.contenedorReportePorCliente}>
            <article className={`${stylesBarraBusqueda.searchContainer} ${stylesBarraBusqueda.containersVentas} ${styles.searchContainer}`}>
                <BarraBusquedaReportes
                    setDatos={setDatoBarraDeBusqueda}
                    tabla='productos'
                />
            </article>
            
            <article className={styles.contenedorCuerpoReporte}>
                <ul>
                    {ventasFiltradas.map( ventaPorProducto => {
                        return (
                            <VentaPorProducto ventaPorProducto={ventaPorProducto} key={ventaPorProducto.id_producto}
                            />
                        )
                    })}
                </ul>
            </article>
            
            {/* <article className={stylesReportes.contenedorBotonesReporte}>
                botones
            </article> */}
        </section>
    ) :
    (
        <section className={styles.contenedorReportePorCliente}>
            <article className={`${stylesBarraBusqueda.searchContainer} ${stylesBarraBusqueda.containersVentas} ${styles.searchContainer}`}>
                <BarraBusquedaReportes
                    setDatos={setDatoBarraDeBusqueda}
                    tabla='productos'
                />
            </article>
            <article className={styles.contenedorCuerpoReporte} style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                <p style={{color: 'var(--second-a-text-color)', fontWeight: '500'}}>
                    {mensaje ? mensaje : 'Sin nada que mostrar. ventasFiltradas en 0'}
                </p>
            </article>
        </section>
    );
    
}