import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BarraBusquedaReportes } from './BarraBusquedaReportes';
import stylesBarraBusqueda from '../../../css/usuarios/Ventas.module.css';
import styles from '../../../css/usuarios/ReportesClientes.module.css';
import { removeTime } from '../../../utils/formateadorDeFechas';
import { VentaPorCliente } from './VentaPorCliente';

export function ReporteDeClientes() {

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
    const [mensaje, setMensaje] = useState(null); //Ventas ordenadas por cliente
    const [ ventasFiltradas, setVentasFiltradas ] = useState(null); //Ventas  ordenadas por cliente y filtradas por fecha/cliente
    // const [datosCliente, setDatosCliente] = useState(null); //Telefono/Nombre del cliente de la barra de busqueda

    //Tomamos todas las ventas y se ordenan por Cliente -> Ventas
    const ordenarPorClientes = useCallback((arrayDeVentas)=>{
        
        setLeyendaReportes('Ventas ordenadas por clientes');

        // Array vacio para guardar el nuevo arreglo
        let ventasOrdenadasPorCliente = [];

        //Mapeo de todas las ventas
        arrayDeVentas.map( (venta, i) => {
            //Objeto vacio para guardar una venta
            let objetoVenta = {};

            //Verificamos que si ya existe un cliente en el nuevo array
            const existeCliente = ventasOrdenadasPorCliente.length > 0 
                ? ventasOrdenadasPorCliente.filter(ventaOrdenada => ventaOrdenada.telefono === venta['Cliente'][0].telefono) 
                : false;
            
            //No existe el cliente o devolvio un array vacio
            if(!existeCliente || existeCliente.length < 1){ 
                
                //Obtenemos al cliente de la venta
                const [ cliente ] = venta.Cliente;
                
                //Actualizamos el objeto venta
                objetoVenta = {
                    Ventas: [{...venta}],
                    ...cliente
                }

                //Lo agregamos al nuevo array
                ventasOrdenadasPorCliente.push(objetoVenta);
            } 
            else { //Ya existe, guardamos la venta en el cliente encontrado en el nuevo arreglo
                if(existeCliente.length > 0) existeCliente[0].Ventas.push(venta);
            }
            
            return null;
        });

        if(datoBarraDeBusqueda && datoBarraDeBusqueda.identificador){
            const ventasOrdenadasPorClienteYTelefono = ventasOrdenadasPorCliente.filter( venta => venta.telefono === datoBarraDeBusqueda.identificador)
            if(ventasOrdenadasPorClienteYTelefono.length > 0) {
                setVentasFiltradas(ventasOrdenadasPorClienteYTelefono); //Guardamos las ventas ya filtradas
                setDatosReporte(ventasOrdenadasPorClienteYTelefono);
                setLeyendaReportes(`Total de compras: ${ventasOrdenadasPorClienteYTelefono.length}`);
            } else {
                setVentasFiltradas(null);
                setDatosReporte(null);
                setMensaje(`El cliente ${datoBarraDeBusqueda.nombre} no tiene ventas en ese periodo.`)
            }
        } else {
            setVentasFiltradas(ventasOrdenadasPorCliente); //Guardamos las ventas ya filtradas
            setDatosReporte(ventasOrdenadasPorCliente);
            setLeyendaReportes(`Total de clientes: ${ventasOrdenadasPorCliente.length}`);
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
            setLeyendaReportes('Ventas ordenadas por clientes');
            setVentasFiltradas(null);
            setDatosReporte(null);
        } else if (fechaIni && fechaFin) { 

            //Filtramos las ventas
            const nuevasVentas = todasLasVentas.data.filter( venta => {
                const fechaVenta = removeTime(new Date(venta.createdAt)); //Remover horas, segundos, etc.
            
                return (fechaVenta.getTime() >= fechaIniEpoch && fechaVenta.getTime() <= fechaFinEpoch );
            })
            
            if(nuevasVentas && nuevasVentas.length > 0) {
                ordenarPorClientes(nuevasVentas);
            } else {
                setMensaje(`Sin ventas en ese periodo`);
                setLeyendaReportes('Ventas ordenadas por clientes');
                setVentasFiltradas(null);
                setDatosReporte(null);
            }
        } else {
            ordenarPorClientes(todasLasVentas.data);
        }

    },[ordenarPorClientes, setLeyendaReportes, fechaIni, fechaFin, todasLasVentas, setDatosReporte]);

    return ventasFiltradas ? (
        <section className={styles.contenedorReportePorCliente}>
            <article className={`${stylesBarraBusqueda.searchContainer} ${stylesBarraBusqueda.containersVentas} ${styles.searchContainer}`}>
                <BarraBusquedaReportes
                    setDatos={setDatoBarraDeBusqueda}
                    tabla='clientes'
                />
            </article>
            
            <article className={styles.contenedorCuerpoReporte}>
                <ul>
                    {ventasFiltradas.map( ventaPorCliente => {
                        return (
                            <VentaPorCliente ventaPorCliente={ventaPorCliente} key={ventaPorCliente._id}
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
                />
            </article>
            <article className={styles.contenedorCuerpoReporte} style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                <p style={{color: 'var(--second-a-text-color)', fontWeight: '500'}}>
                    {mensaje}
                </p>
            </article>
        </section>
    );
}