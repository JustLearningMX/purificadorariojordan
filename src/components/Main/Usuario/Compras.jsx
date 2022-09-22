import { useState, useEffect, useCallback } from 'react';
import styles from '../../../css/usuarios/Compras.module.css';
import botellon from '../../../assets/botellon.png';
import { getInventarioCliente } from '../../../data/peticionesMongo/getInventarioCliente';
import { getHistorialComprasUsuario } from '../../../data/peticionesMongo/reportes/getHistorialComprasUsuario';
import { getHistorialDeLlenadosGratisUsuario } from '../../../data/peticionesMongo/reportes/getHistorialDeLlenadosGratisUsuario';
import { Spinner } from '@styled-icons/evil';
import spinner from '../../../css/varios/Spinner.module.css';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import { ModalFormHistorial } from '../../Main/MisCompras/ModalFormHistorial';
import { blue } from '@mui/material/colors';
import { Done } from '@styled-icons/material';

export function Compras() {
        
    const [ultimaCompraCliente, setUltimaCompraCliente] = useState(null);//Estado de la ultima compra del cliente
    const [promo] = useState(10); //promocion de garrafones de 19lts
    const [historialComprasCliente, setHistorialComprasCliente] = useState(null); //Datos de la API
    const [historialDeLlenadosGratisCliente, setHistorialDeLlenadosGratisCliente] = useState(null); //Datos de la API
    const [dataHistorial, setDataHistorial] = useState(null); //Datos segun boton elegido
    const [tituloModal, setTituloModal] = useState('');
    
    //Mostrar mensajes de alerta
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    /**Opciones para la Modal Crear */
    const [open, setOpen] = useState(false);

    const handleOpen = (boton)=>{
        //Se elige boton Historial de compras o Historial de llenados gratis
        boton === 'compras' ? setDataHistorial(historialComprasCliente) : setDataHistorial(historialDeLlenadosGratisCliente);
        boton === 'compras' ? setTituloModal('compras') : setTituloModal('llenados gratis');
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    /**Botones para la ventana modal Crear */
    const arrayBotones = [ 
        {nombre: 'Aceptar', color: blue, icon: <Done />}, 
    ];

    //Llamada a la API
    const fetchData = useCallback( async ()=>{
        try {
            
            if(dataSnackBar.countOpens < 1) {
                const [
                    dataInventarioCliente, 
                    dataHistorialComprasCliente, 
                    dataHistorialDeLlenadosGratisCliente
                ] = await Promise.allSettled(
                    [  //Llamadas a la API
                        await getInventarioCliente(), 
                        await getHistorialComprasUsuario(),
                        await getHistorialDeLlenadosGratisUsuario(),
                    ]
                );

                // console.log('dataHistorialComprasCliente', dataHistorialComprasCliente);
                // console.log('dataHistorialDeLlenadosGratisCliente', dataHistorialDeLlenadosGratisCliente);

                if(dataInventarioCliente.error){ //Error por autenticacion
                    setUltimaCompraCliente(-1);
                    setDataSnackBar({mensaje: dataInventarioCliente.message, severity: "error", countOpens: 1 });    
                } else {

                    //Datos de los historiales del usuario.
                    setHistorialComprasCliente(dataHistorialComprasCliente);
                    setHistorialDeLlenadosGratisCliente(dataHistorialDeLlenadosGratisCliente);

                    if(!dataInventarioCliente.fueEncontrado){ //El usuario no tiene compras previas
                        setUltimaCompraCliente(0);
                        setDataSnackBar({mensaje: 'No tiene compras previas.', severity: "info", countOpens: 1 });
                    } else { //El usuario ya tiene compras previas
                        setUltimaCompraCliente(dataInventarioCliente.datos.cantidad_actual);
                    }
                }
            }
        } catch (error) { //Error con la BD
            setUltimaCompraCliente(-1);
            setDataSnackBar({mensaje: `Hubo un error con la API: ${error}`, severity: "error", countOpens: 1 });
        }
    }, [dataSnackBar.countOpens]);

    //Verifica la ultima compra del cliente
    useEffect(()=>{
        if(!ultimaCompraCliente) fetchData(); //Si no esta el dato, se conecta a la BD para obtenerlo
    }, [fetchData, ultimaCompraCliente]);

    return typeof ultimaCompraCliente === 'number' ? (
        <section className={styles.contenedorPrincipal}>

            <p className={styles.tituloCompras}>Llenado gratis:</p>
            <div className={styles.infoComprasContainer}>
                <img src={botellon} alt="logo de botellon" className={styles.imgCompras} />

                <p className={styles.pFraseCompras}>Haz llenado  
                    <span className={styles.spanCompras}>{` ${ultimaCompraCliente}`}</span>
                    <span className={styles.spanFraseCompras}> botellones.</span>
                </p>                

                <p className={styles.pFraseCompras}>Sólo te faltan
                    <span className={styles.spanCompras}>{` ${promo-ultimaCompraCliente}`}</span>
                    <span className={styles.spanFraseCompras}> más para alcanzar el llenado de uno gratis.</span>
                </p>
            </div>

            <div className={styles.buttonsComprasContainer}>
                <input 
                    type="submit" 
                    value="Historial de compras" 
                    className={styles.historialCompras}
                    onClick={() => handleOpen('compras')}
                />
                <input 
                    type="submit" 
                    value="Mis llenados gratis" 
                    className={styles.historialGratis}
                    onClick={() => handleOpen('gratis')}
                />
            </div>

            <p className={styles.leyendaCompras}>¡Sigue llenando para seguir ganando!</p>
            <p className={styles.pieCompras}>Se aplican restricciones. Cambios sin previo aviso. Programa "Llenado Gratis": A partir de  
                <span className={styles.spanPieCompras}>{` ${promo}`} botellones el 11vo es gratis.</span>
            </p>
            
            <ModalFormHistorial
                open={open}
                onClose={handleClose}
                botones={arrayBotones}
                titulo={tituloModal}
                dataHistorial={dataHistorial}
            />
            
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