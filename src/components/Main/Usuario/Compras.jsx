import { useState, useEffect, useCallback } from 'react';
import styles from '../../../css/usuarios/Compras.module.css';
import botellon from '../../../assets/botellon.png';
import { getInventarioCliente } from '../../../data/peticionesMongo/getInventarioCliente';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';

export function Compras() {
    
    //Estado de la ultima compra del cliente
    const [ultimaCompra, setUltimaCompra] = useState(null);
    const [promo] = useState(10);

    //Mostrar mensajes de alerta
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    //Llamada a la API
    const fetchData = useCallback( async ()=>{
        try {
            // const [data] = await Promise.all(
            // );
            if(dataSnackBar.countOpens < 1) {
                const data = await getInventarioCliente();

                if(data.error){ //Error por autenticacion
                    setUltimaCompra(0);
                    setDataSnackBar({mensaje: data.message, severity: "error", countOpens: 1 });    
                } else {
                    if(!data.fueEncontrado){ //El usuario no tiene compras previas
                        setUltimaCompra(0);
                        setDataSnackBar({mensaje: 'No tiene compras previas.', severity: "info", countOpens: 1 });
                    } else { //El usuario ya tiene compras previas
                        setUltimaCompra(data.datos.cantidad_actual);
                    }
                }
            }
        } catch (error) { //Error con la BD
            setUltimaCompra(0);
            setDataSnackBar({mensaje: `Hubo un error con la API: ${error}`, severity: "error", countOpens: 1 });
        }
    }, [dataSnackBar.countOpens]);

    //Verifica la ultima compra del cliente
    useEffect(()=>{
        if(!ultimaCompra) fetchData(); //Si no esta el dato, se conecta a la BD para obtenerlo
    }, [fetchData, ultimaCompra]);

    return ultimaCompra >= 0 ? (
        <section className={styles.contenedorPrincipal}>

            <p className={styles.tituloCompras}>Llenado gratis:</p>
            <div className={styles.infoComprasContainer}>
                <img src={botellon} alt="logo de botellon" className={styles.imgCompras} />

                <p className={styles.pFraseCompras}>Haz llenado  
                    <span className={styles.spanCompras}>{` ${ultimaCompra}`}</span>
                    <span className={styles.spanFraseCompras}> botellones.</span>
                </p>                

                <p className={styles.pFraseCompras}>Sólo te faltan
                    <span className={styles.spanCompras}>{` ${promo-ultimaCompra}`}</span>
                    <span className={styles.spanFraseCompras}> más para alcanzar el llenado de uno gratis.</span>
                </p>
            </div>

            <div className={styles.buttonsComprasContainer}>
                <input type="submit" value="Ver mi historial" className={styles.comprarPedido} />
            </div>

            <p className={styles.leyendaCompras}>¡Sigue llenando para seguir ganando!</p>
            <p className={styles.pieCompras}>Se aplican restricciones. Cambios sin previo aviso. Programa "Llenado Gratis": A partir de  
                <span className={styles.spanPieCompras}>{` ${promo}`} botellones el 11vo es gratis.</span>
            </p>            
            
            {cargarSnackBar(dataSnackBar)}
        </section>
    ) : 
        <section className={styles.seccionSpinner}>
            <Spinner className={spinner.spinner} />
        </section>;
}

function cargarSnackBar({mensaje, severity, countOpens}){    
    if(countOpens > 0) {
        return <CustomizedSnackbars mensaje={mensaje} severity={severity} countOpens={countOpens} />
    }
}