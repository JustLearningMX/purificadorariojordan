import { useEffect, useState, useCallback } from 'react';
import styles from '../../../css/usuarios/Ventas.module.css'

/**Componente que renderiza la seccion del subtotal, descto y total */
export function ResumenDeCompras({productos}){

    const [subTotal, setSubTotal] = useState(''); //A pagar antes del descuento 
    const [descuento, setDescuento] = useState(''); //Descuento por programa 10x1 gratis
    const [total, setTotal] = useState(''); //Total a pagar
    let [garrafonesActuales, setGarrafonesActuales] = useState(0); //Total de garrafones previos del cliente
    const [promo] = useState(10); //Numero de garrafones que debe tener para ganar uno gratis
    const [ isGarrafon, setIsGarrafon] = useState(false); //Verifica si se ha comprado un Garrafon

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
    
    /**Actualiza el subtotal */
    const actualizarSubtotal = useCallback((precio, total)=>{

        return total * precio;

    },[]);

    /**Actualiza el descuento */
    const actualizarDescuento = useCallback((precio)=>{

        //Condicion: si llega a 11 garrafones, se asigna el descuento        
        if(garrafonesActuales <= promo){
            setGarrafonesActuales(garrafonesActuales++);
        } 
        else if(garrafonesActuales > promo) {

            console.log(`Felicidades, ha ganado llenados gratis y estás ahorrando`);
            setGarrafonesActuales(0);
            
            (typeof descuento === 'string') ? setDescuento(parseInt(precio)) : setDescuento(descuento + parseInt(precio));
        }
        
    },[garrafonesActuales, promo, descuento]);

    const actualizarTotal = useCallback(()=>{
        if(descuento){
            setTotal( subTotal - descuento);
        }

        if(!isGarrafon) {
            setTotal( subTotal - 0);
        }

    }, [descuento, subTotal, isGarrafon]);

    useEffect(()=>{            
        let suma = 0;
        let conteoGarrafones = 0;

        productos.map(([ [ {id, precio} ], total ])=>{            
            
            //SUBTOTAL
            suma = suma + actualizarSubtotal(Number(precio.$numberDecimal), total);

            //DESCUENTO
            //Si es un garrafón de 20 lts
            if(id === '62f2a17281de05ae2869feab') {                                
                actualizarDescuento(Number(precio.$numberDecimal));
                conteoGarrafones++;              
            }

            //TOTAL
            //Actualizar el total
            actualizarTotal();
            

            return null;
        });

        setSubTotal(suma);
        setIsGarrafon(conteoGarrafones > 0 ? true : false);  
        
        if(productos.length <= 0) {
            setDescuento('');
            setSubTotal('');
            setTotal('');
        }

        if(!isGarrafon) {
            setDescuento(0);
            actualizarTotal();
        }

    },[productos, actualizarSubtotal, actualizarDescuento, actualizarTotal, isGarrafon]);


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