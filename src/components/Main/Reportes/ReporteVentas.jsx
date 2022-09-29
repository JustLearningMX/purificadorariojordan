import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from '../../../css/usuarios/Reportes.module.css';
import { VentaCompleta } from './VentaCompleta';
import { removeTime } from '../../../utils/formateadorDeFechas';

export function ReporteVentas() {

    //Estados que vienen de Reportes.jsx
    const {
        todasLasVentas, //Array de las ventas
        fechaIni, //Fecha inicial del periodo
        fechaFin, //Fecha final del periodo
        setLeyendaReportes,
    } = useOutletContext();

    //Ventas a mostrar en el componente. Si no se 
    //elige un periodo se muestran todas las ventas
    const [ ventasFiltradas, setVentasFiltradas ] = useState(null);

    //Cambios en los estados
    useEffect( ()=> {

        //Para verificar si existe un periodo valido
        const fechaIniEpoch = fechaIni ? fechaIni.getTime() : 0;
        const fechaFinEpoch = fechaFin ? fechaFin.getTime() : 0;

        // Si existe o no un periodo valido
        if( (fechaIniEpoch > fechaFinEpoch) ){
            setLeyendaReportes(`Ingrese un periodo valido. Reporte de ventas`);
            setVentasFiltradas(todasLasVentas.data);
        } else if (fechaIni && fechaFin) {        
            const nuevasVentas = todasLasVentas.data.filter( venta => {
                const fechaVenta = removeTime(new Date(venta.createdAt)); //Remover horas, segundos, etc.
              
                return (fechaVenta.getTime() >= fechaIniEpoch && fechaVenta.getTime() <= fechaFinEpoch );
            })
            
            setVentasFiltradas(nuevasVentas);
            setLeyendaReportes(`Total de ventas: ${nuevasVentas.length}`);
        } else {
            setVentasFiltradas(todasLasVentas.data);
            setLeyendaReportes(`Total de ventas: ${todasLasVentas.data.length}`);
        }

    },[todasLasVentas, fechaIni, fechaFin, setLeyendaReportes]);

    return (ventasFiltradas && ventasFiltradas.length > 0) ? (
        <section className={styles.contenedorReporte}>
            <article className={styles.contenedorCuerpoReporte}>
                <ul>
                    {ventasFiltradas.map( (venta) => {
                        return <VentaCompleta venta={venta} key={venta.id_venta} />
                    })}
                </ul>
            </article>
            
            <article className={styles.contenedorBotonesReporte}>
                botones
            </article>
        </section>
    ) :
    (
        <section style={{display: 'flex', marginTop: '2rem', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem'}}>
            <p style={{color: 'var(--second-a-text-color)', fontWeight: '500'}}>
                Sin ventas que mostrar
            </p>
        </section>
    );
    
}