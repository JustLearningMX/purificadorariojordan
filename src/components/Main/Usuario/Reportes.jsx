import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ADMIN, REPORTES, RPR_VENTAS, RPR_USUARIOS, RPR_PRODUCTOS } from '../../../config/router/paths.js';
import { getVentasTodos } from '../../../data/peticionesMongo/reportes/getVentasTodos';
import pestanasStyles from '../../../css/varios/Pestanhas.module.css';
import styles from '../../../css/usuarios/Reportes.module.css';
import { dividirFecha } from '../../../utils/formateadorDeFechas';
import { FileExcel2 } from '@styled-icons/remix-fill';
import { FileEarmarkPdfFill } from '@styled-icons/bootstrap';
import { Peticiones } from '../../../data/peticionesMongo/peticionesHTTP';

export function Reportes() {
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    const [ fechaIni, setFechaIni ] = useState(null); //Fecha inicial del reporte de ventas
    const [ fechaFin, setFechaFin ] = useState(null); //Fecha final del reporte de ventas
    const [todasLasVentas, setTodasLasVentas] = useState(null); //Todas las ventas traidas de la BD
    const [ leyendaReportes, setLeyendaReportes ] = useState('Reporte por ventas');
    const [datosReporte, setDatosReporte] = useState(null);
    const [datoBarraDeBusqueda, setDatoBarraDeBusqueda] = useState(null); //Item de la barra de busqueda

    //Funcion que trae info de la BD
    const fetchDataBD = useCallback( async()=>{
        try {

            //Peticion a la API
            const [
                {value: dataTodasLasVentas},
            ] = await Promise.allSettled(
                [getVentasTodos(),]                
            );
            // console.log(dataTodasLasVentas)
            if(dataTodasLasVentas.error){ //Si error es en la peticion del cliente
                setLeyendaReportes('Error al traer las ventas', dataTodasLasVentas.message);
            } else if(dataTodasLasVentas.tieneDatos) { //Si hay ventas
                setTodasLasVentas(dataTodasLasVentas);
            } else { //Si no hay ventas
                setLeyendaReportes('Sin ventas');
            }

        } catch (error) { //Si hay error con MongoDB
            console.log('Hubo un error en la BD: ', error);
        }
    },[]);

    //Cambia el estado del componente
    useEffect(()=>{
        if(!todasLasVentas){ //Si no existe el arreglo de ventas
            fetchDataBD(); //Se llama a la API
        }
    },[todasLasVentas, fetchDataBD])

    return (
        <section className={pestanasStyles.contenedorPrincipal}>
            
            <h1 className={pestanasStyles.tituloSeccion}>Reportes</h1>

            <article className={pestanasStyles.contenedorLinks}>
                <div className={pestanasStyles.links}>
                     <Link to={`${ADMIN}${REPORTES}/` + RPR_VENTAS} onClick={()=>handleClick(0)}>Ventas</Link>
                </div>
                <div className={pestanasStyles.links}>
                     <Link to={`${ADMIN}${REPORTES}/` + RPR_USUARIOS} onClick={()=>handleClick(1)}>Clientes</Link>
                </div>
                <div className={pestanasStyles.links}>
                     <Link to={`${ADMIN}${REPORTES}/` + RPR_PRODUCTOS} onClick={()=>handleClick(2)}>Productos</Link>
                </div>
            </article>
            <article className={styles.contenedorIntervaloFecha}>
                <div className={styles.contenedorFechas}>
                    <div className={styles.contenedorFecha}>
                        <p>Del:</p>
                        <input 
                            type="date" 
                            name="fechaInicial" 
                            id="fechaInicial" 
                            onChange={(e)=>handleFechaIni(e, setFechaIni)}
                        />
                    </div>
                    <div className={styles.contenedorFecha}>
                        <p>Al:</p>
                        <input 
                            type="date" 
                            name="fechaFinal" 
                            id="fechaFinal" 
                            onChange={(e)=>handleFechaFin(e, setFechaFin)}
                        />
                    </div>
                </div>
                <div className={styles.contenedorLeyenda}>
                    <p>{leyendaReportes}</p>
                </div>
            </article>
            <article className={styles.contenedorOutlet}>
                <Outlet 
                    context={
                        {
                            fechaIni,
                            fechaFin,
                            todasLasVentas,
                            setLeyendaReportes,
                            setDatosReporte,
                            setDatoBarraDeBusqueda,
                            datoBarraDeBusqueda
                        }
                    }
                />
            </article>

            <article className={styles.contenedorBotonesReporte}>
                <figure className={`${styles.icons_container}`} > 
                    <FileExcel2 onClick={() => handleClickGenerate('excel', datosReporte, fechaIni, fechaFin, datoBarraDeBusqueda, userToken.token)} />
                </figure>
                <figure className={`${styles.icons_container}`} > 
                    <FileEarmarkPdfFill onClick={() => handleClickGenerate('pdf', datosReporte, fechaIni, fechaFin, datoBarraDeBusqueda, userToken.token)} />
                </figure>
            </article>

        </section>
    );
}

/**Funcion que resalta la pestanha actual seleccionada */
function handleClick(pos){

    const links = document.getElementsByClassName(`${pestanasStyles.links}`);
    
    for(let i=0; i < links.length; i++){
        if(links[i].classList.contains(`${pestanasStyles.link_selected}`))
            links[i].classList.toggle(`${pestanasStyles.link_selected}`)
    }
    
    links[pos].classList.toggle(`${pestanasStyles.link_selected}`);
}

/**Funcion que maneja eventos en el campo fecha DE: */
function handleFechaIni(e, setFechaIni) {
    //Separar dia, mes y anho
    const [year, month, day] = dividirFecha(e.target.value);
    //Convertirlo a fecha de formato JS
    const fecha = new Date(year, month-1, day);
    //Actualizar la fecha inicial
    setFechaIni(fecha);
}

/**Funcion que maneja eventos en el campo fecha Al: */
function handleFechaFin(e, setFechaFin) {
    //Separar dia, mes y anho
    const [year, month, day] = dividirFecha(e.target.value);
    //Convertirlo a fecha de formato JS
    const fecha = new Date(year, month-1, day);
    //Actualizar la fecha inicial
    setFechaFin(fecha);
}

async function handleClickGenerate(tipoReporte, datosReporte, fechaIni, fechaFin, datoBarraDeBusqueda, token) {
    
    //Nombre de la pestana actual
    const links = document.getElementsByClassName(`${pestanasStyles.links}`);
    let pestana = null;
    const identificador = datoBarraDeBusqueda ? datoBarraDeBusqueda.identificador : null;
    const nombre = datoBarraDeBusqueda ? datoBarraDeBusqueda.nombre : null;

    for(let i=0; i < links.length; i++){
        if(links[i].classList.contains(`${pestanasStyles.link_selected}`))
            pestana = links[i].textContent;
    }

    //Generamos un cuerpo para la peticion a la API
    if(!pestana || !tipoReporte || !datosReporte) {
        console.log('Seleccione un tipo de informacion para generar el reporte')
    } else {
        
        const nombreDeArchivo = `reporteDe${pestana}`;

        // if(pestana === 'Ventas') {
            try {
                await Peticiones.crearVentasEnExcel(pestana, tipoReporte, fechaIni, fechaFin, nombre, identificador, token, nombreDeArchivo);

            } catch (error) {
                console.log(error);
            }
        // }
    }
}