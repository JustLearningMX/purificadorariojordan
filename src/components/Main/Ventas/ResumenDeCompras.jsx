import { useEffect, useState, useCallback } from 'react';
import styles from '../../../css/usuarios/Ventas.module.css'

export function ResumenDeCompras({productos}){

    const [subTotal, setSubTotal] = useState('');
    const [descuento, setDescuento] = useState('');
    const [total, setTotal] = useState('');
    let [garrafonesActuales, setGarrafonesActuales] = useState(0);
    const [promo] = useState(10);

    const cambiosEnSubtotal = (event)=>{
        setSubTotal(event.target.value);
    }

    const cambiosEnDescuento = (event)=>{
        setDescuento(event.target.value);
    }

    const cambiosEnTotal = (event)=>{
        setTotal(event.target.value);
    }

    const actualizarSubtotal = useCallback((precio, total)=>{

        return parseInt(total) * precio;

    },[]);

    const actualizarDescuento = useCallback((precio)=>{

        if(garrafonesActuales < promo){
            setGarrafonesActuales(garrafonesActuales++);
        }

        if(garrafonesActuales === promo) {

            console.log(`Felicidades, ha ganado llenados gratis y estás ahorrando`);
            setGarrafonesActuales(0);
            
            (typeof descuento === 'string') ? setDescuento(parseInt(precio)) : setDescuento(descuento + parseInt(precio));
        }
        
    },[garrafonesActuales, promo, descuento]);

    const actualizarTotal = useCallback(()=>{

        if(descuento){
            setTotal( subTotal - descuento);
        }

    }, [descuento, subTotal]);

    useEffect(()=>{            
        let suma = 0;

        productos.map(([ [ {id, precio} ], total ])=>{
            
            //SUBTOTAL
            suma = suma + actualizarSubtotal(precio, total);

            //DESCUENTO
            //Si es un garrafón de 20 lts
            if(id === 1) {                                
                actualizarDescuento(precio);                
            }

            //TOTAL
            //Actualizar el total
            actualizarTotal()
            

            return null;
        });

        setSubTotal(suma);
        
        if(productos.length <= 0) {
            setDescuento('');
            setSubTotal('');
            setTotal('');
        }

    },[productos, actualizarSubtotal, actualizarDescuento, actualizarTotal]);


    return ( <>
        <div className={styles.divSubtotal}>
            <label className={`${styles.labelsPuntoDeVenta} ${styles.labelSubtotal}`} htmlFor="inputSubtotal">Subtotal:</label>
            <input 
                name="inputSubtotal" 
                className={`${styles.inputsCarrito} ${styles.inputSubtotal}`} 
                type="text" 
                placeholder="0.00"
                value={subTotal ? `$${subTotal.toFixed(2)}` : ''}
                onChange={cambiosEnSubtotal}
            >
            </input>
        </div>
        <div className={styles.divDescuento}>
            <label className={`${styles.labelsPuntoDeVenta} ${styles.labelDescuento}`} htmlFor="inputDescuento">Descuento:</label>
            <input 
                name="inputDescuento" 
                className={`${styles.inputsCarrito} ${styles.inputDescuento}`} 
                type="text" 
                placeholder="0.00"
                value={descuento ? `$${descuento.toFixed(2)}` : ''}
                onChange={cambiosEnDescuento}
            >
            </input>
        </div>
        <div className={styles.divTotal}>
            <label className={`${styles.labelsPuntoDeVenta} ${styles.labelTotal}`} htmlFor="inputTotal">Total:</label>
            <input 
                name="inputTotal" 
                className={`${styles.inputsCarrito} ${styles.inputTotal}`} 
                type="text" 
                placeholder="0.00"
                value={total ? `$${total.toFixed(2)}` : ''}
                onChange={cambiosEnTotal}
            >
            </input>
        </div>
        <div className={styles.divInputBtnCobrar}>
            <input className={styles.botonPagar} type="submit" value="Pagar"></input>
        </div>
    </>);
}