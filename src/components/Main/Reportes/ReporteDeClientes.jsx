import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BarraBusquedaCliente } from '../Reportes/BarraBusquedaCliente';
import stylesBarraBusqueda from '../../../css/usuarios/Ventas.module.css';
import styles from '../../../css/usuarios/ReportesClientes.module.css';
import stylesReportes from '../../../css/usuarios/Reportes.module.css';
import { removeTime } from '../../../utils/formateadorDeFechas';
import { VentaPorCliente } from './VentaPorCliente';

export function ReporteDeClientes() {

    //Estados que vienen de Reportes.jsx
    const {
        todasLasVentas, //Array de las ventas
        fechaIni, //Fecha inicial del periodo
        fechaFin, //Fecha final del periodo
        setLeyendaReportes,
    } = useOutletContext();

    const [mensaje, setMensaje] = useState(null); //Ventas ordenadas por cliente
    const [ ventasFiltradas, setVentasFiltradas ] = useState(null); //Ventas  ordenadas por cliente y filtradas por fecha/cliente
    const [telefonoCliente, setTelefonoCliente] = useState(null); //Telefono del cliente de la barra de busqueda

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

        // setVentasPorClientes(ventasOrdenadasPorCliente);
        setVentasFiltradas(ventasOrdenadasPorCliente);
        setLeyendaReportes(`Total de clientes: ${ventasOrdenadasPorCliente.length}`);

    },[setLeyendaReportes]);

    //Cambios en los estados
    useEffect( ()=> {

        //Para verificar si existe un periodo valido
        const fechaIniEpoch = fechaIni ? fechaIni.getTime() : 0;
        const fechaFinEpoch = fechaFin ? fechaFin.getTime() : 0;
        
        // Si existe o no un periodo valido
        if( (fechaIniEpoch > fechaFinEpoch) ) {
            setMensaje(`Ingrese un periodo de fechas valido.`);
            setLeyendaReportes('Ventas ordenadas por clientes');
            setVentasFiltradas(null);
        } else if (fechaIni && fechaFin) { 
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
            }
        } else {
            ordenarPorClientes(todasLasVentas.data);
        }

    },[ordenarPorClientes, setLeyendaReportes, fechaIni, fechaFin, todasLasVentas]);

    return ventasFiltradas ? (
        <section className={styles.contenedorReportePorCliente}>
            <article className={`${stylesBarraBusqueda.searchContainer} ${stylesBarraBusqueda.containersVentas} ${styles.searchContainer}`}>
                <BarraBusquedaCliente
                    telefonoCliente={telefonoCliente}
                    setTelefonoCliente={setTelefonoCliente}
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
            
            <article className={stylesReportes.contenedorBotonesReporte}>
                botones
            </article>
        </section>
    ) :
    (
        <section style={{display: 'flex', marginTop: '2rem', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem'}}>
            <p style={{color: 'var(--second-a-text-color)', fontWeight: '500'}}>
                {mensaje}
            </p>
        </section>
    );
    
}