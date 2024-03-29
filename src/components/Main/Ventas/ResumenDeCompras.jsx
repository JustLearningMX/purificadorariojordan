import { useEffect, useState, useCallback } from 'react';
import styles from '../../../css/usuarios/Ventas.module.css';
import { LoadingButton } from '@mui/lab';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import { crearVenta } from '../../../data/peticionesMongo/crearVenta';

/**Componente que renderiza la seccion del subtotal, descto y total */
export function ResumenDeCompras({productos, setProductos, telefonoCliente, cantidadBD, setUsers, setValueCliente, setCantidadBD}){

    const [subTotal, setSubTotal] = useState(''); //A pagar antes del descuento 
    const [descuento, setDescuento] = useState(''); //Descuento por programa 10x1 gratis
    const [total, setTotal] = useState(''); //Total a pagar
    let [garrafonesActuales, setGarrafonesActuales] = useState(0); //Total de garrafones que el cliente esta llenando
    let [garrafonesGratis, setGarrafonesGratis] = useState(0); //Garrafones gratis por la compra
    const [promo] = useState(10); //Numero de garrafones que debe tener para ganar uno gratis
    const [sucursal] = useState('62f56937b841d5b06b7ac4b4');
    const [detalleVenta, setDetalleVenta] = useState([]); //Detalle de la venta
    const [isLoading, setIsLoading] = useState(false); //Estado del boton pagar    
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    //Eventos para cambios en los Input
    const cambiosEnSubtotal = (event)=>{
        setSubTotal(event.target.value);
    }
    const cambiosEnDescuento = (event)=>{
        setDescuento(event.target.value);
    }
    const cambiosEnTotal = (event)=>{
        setTotal(event.target.value);
    }

    /**Actualiza el total */
    const actualizarTotal = useCallback(()=>{
        if(descuento){
            setTotal( subTotal - descuento);
        } else {
            setTotal(subTotal)
        }
    }, [descuento, subTotal]);

    //Se calcula el pago basado en el array de productos recibidos
    useEffect(()=> {
        let sumaSubtotal = 0;
        let sumaDescuento = 0; //(typeof descuento === 'string') ? 0 : descuento;
        let garrafonGratis = 0;
        let precioGarrafon = null;
        let detalleVenta = [];
        let es19lts = false;
        
        //Si el array de los productos no viene vacio
        if(productos.length > 0){

            //Obtenemos los garrafones de 19lts
            const garrafones19lts = productos
                .map(([ [ {id, precio} ], total ]) => { //Mapeamos todos los Productos del array

                    const precioVenta = Number(precio.$numberDecimal);
                    //Suma de total * precio de cada Item, para el subtotal
                    sumaSubtotal = sumaSubtotal + ((precioVenta * total));              
                    
                    //Guardamos los productos y sus detalles de venta
                    detalleVenta.push({"id_producto": id, "cantidad": total, "precio": precioVenta });

                    return {id, precio, total}
                } )
                .filter( producto => {return (producto.id === '62f2a17281de05ae2869feab')}); //Aqui filtramos los garrafones

            //Si existe un garrafon de 19 lts
            if(garrafones19lts[0]) {
                es19lts = true;
                const totalDeGarrafones = cantidadBD + garrafones19lts[0].total; //BD + su compra actual
                const garrafonSobrante = totalDeGarrafones % (promo+1); //Garrafones que sobran ... o no
                garrafonGratis = totalDeGarrafones/(promo+1); //Si no hay residuo entonces es el total de garrafones gratis
                precioGarrafon = garrafones19lts[0].precio;
                
                /*************A eliminar */
                // console.log('cantidadBD', cantidadBD);
                // console.log('totalDeGarrafones', totalDeGarrafones);
                // console.log('garrafonSobrante', garrafonSobrante);
                // console.log('garrafonGratis', garrafonGratis);

                //Actualizacion de los garrafones que lleva
                setGarrafonesActuales(garrafonSobrante);
                
                //Llenado gratis
                if(garrafonGratis >= 1) {
                    garrafonGratis = garrafonGratis >= 1 ? parseInt(garrafonGratis) : 0;
                    sumaDescuento = garrafonGratis * parseFloat(precioGarrafon.$numberDecimal);
                }
                setGarrafonesGratis(parseInt(garrafonGratis));                
            } 

            //Si la lista viene con otros productos pero no garrafones de 20 lts
            if(!es19lts) {
                setDescuento(0);
                setGarrafonesActuales(cantidadBD);
                setGarrafonesGratis(garrafonGratis);
            } else {
                //Se manda a actualizar el descuento cada 11vo Botellon      
                setDescuento(sumaDescuento);
            }
            
        } else { //Si la lista de productos viene vacia
            (cantidadBD > 0) ? setGarrafonesActuales(cantidadBD) : setGarrafonesActuales(0);  
            setSubTotal('');          
            setDescuento('');
            setTotal('');            
            setGarrafonesGratis(garrafonGratis);
        }

        //Detalle de los productos de la venta
        setDetalleVenta(detalleVenta);

        // SUBTOTAL: Actualiza el Subtotal
        setSubTotal(sumaSubtotal);

        // TOTAL: Actualiza el total
        actualizarTotal();

    },[productos, cantidadBD, actualizarTotal, promo, descuento, garrafonesActuales]);    

    async function handleClickPagar() {
        const user = JSON.parse(window.localStorage.getItem('UsuarioPurificadora')); //Token del empleado

        setIsLoading(true); //Se deshabilita boton pagar

        if(detalleVenta.length <= 0) { //Si no hay un producto
            const mensaje = "Para cobrar primero ingrese uno o más productos.";
            setDataSnackBar({mensaje: mensaje, severity: "warning", countOpens: (dataSnackBar.countOpens+1) });                
            setIsLoading(false);
        } else { //Si hay productos
            //Se guardan los valores en un objeto
            const body = { //Cuerpo de la peticion
                venta: {
                    telefono_cliente: telefonoCliente ? telefonoCliente : '0000000000',
                    id_sucursal: sucursal,
                    id_empleado: user.id
                },
                detalleVenta: detalleVenta,
                inventarioCliente: {cantidad_actual: garrafonesActuales},
                llenadoGratis: {cantidad: garrafonesGratis},
            };

            //Peticion a la API de la BD
            const data = await crearVenta(body);

            if(data.error) { //Si retorno una respuesta con un error
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
                setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });                
                setIsLoading(false);
            } else { // Si la respuesta fue correcta
                const mensaje = data.message;
                setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                setProductos([]);

                setValueCliente('');
                setUsers([]);
                setCantidadBD(0);
                setIsLoading(false);
            }
        }
    }

    return ( <> 
        <div className={styles.divSubtotal}>
            <label className={`${styles.labelsPuntoDeVenta} ${styles.labelSubtotal}`} htmlFor="inputSubtotal">Subtotal:</label>
            <input 
                id="inputSubtotal" 
                name="inputSubtotal"  
                type="text" 
                className={`${styles.inputsCarrito} ${styles.inputSubtotal}`}
                placeholder="0.00"
                value={subTotal ? `$${subTotal.toFixed(2)}` : ''}
                onChange={cambiosEnSubtotal}
            >
            </input>
        </div>
        <div className={styles.divDescuento}>
            <label className={`${styles.labelsPuntoDeVenta} ${styles.labelDescuento}`} htmlFor="inputDescuento">Descuento:</label>
            <input 
                id="inputDescuento"
                name="inputDescuento" 
                type="text" 
                className={`${styles.inputsCarrito} ${styles.inputDescuento}`} 
                placeholder="0.00"
                value={descuento ? `$${descuento.toFixed(2)}` : ''}
                onChange={cambiosEnDescuento}
            >
            </input>
        </div>
        <div className={styles.divTotal}>
            <label className={`${styles.labelsPuntoDeVenta} ${styles.labelTotal}`} htmlFor="inputTotal">Total:</label>
            <input 
                id="inputTotal" 
                name="inputTotal"  
                type="text" 
                className={`${styles.inputsCarrito} ${styles.inputTotal}`}
                placeholder="0.00"
                value={total ? `$${total.toFixed(2)}` : ''}
                onChange={cambiosEnTotal}
            >
            </input>
        </div>
        <div className={styles.divResumenLlenados}>
            <p>Acumulados: <span> {garrafonesActuales} </span> </p>
            <p>Garrafones gratis: <span> {garrafonesGratis} </span> </p>
        </div>
        <div className={styles.divInputBtnCobrar}>
            <LoadingButton 
                loading={isLoading}
                variant="contained"
                type='submit'
                size="large"
                className={styles.botonPagar}
                sx={{marginTop: '.7rem'}}
                onClick={handleClickPagar}
            >
                Pagar
            </LoadingButton>
        </div>        
        {cargarSnackBar(dataSnackBar)}
    </>);
}

function cargarSnackBar({mensaje, severity, countOpens}){    
    if(countOpens > 0) {
        return <CustomizedSnackbars mensaje={mensaje} severity={severity} countOpens={countOpens} />
    }
}