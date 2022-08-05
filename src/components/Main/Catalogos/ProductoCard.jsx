import styles from '../../../css/usuarios/Catalogos.module.css';
import { Edit }  from '@styled-icons/material-rounded';
import { RemoveCircle }  from '@styled-icons/material';
import { ModalForm } from '../../Varios/ModalForm';
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Done } from '@styled-icons/material';
import { Clear } from '@styled-icons/material';

const arrayBotones = [
    {nombre: 'Si', color: blue, icon: <Done />}, 
    {nombre: 'No', color: red, icon: <Clear />}
];

export function ProductoCard({producto, gestionarPeticion}){

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No');
    const handleOpen = ()=>{
        // setIsLoading(true);
        setOpen(true);
    }

    const handleClose = (value) => {
        // setIsLoading(false);
        setOpen(false);
        if(value === "Si") setSelectedValue(value);
    }

    return (<li className={styles.itemProductos}>
        <div className={styles.divDatosContainer}>
            <p className={styles.nombreProducto}>
                {producto.nombre}
            </p>
            <p className={styles.cantidadProducto}>
                {`${producto.cantidad} ${producto.medida}`}
            </p>
            <p className={styles.precioProducto}>
                {`$${Number(producto.precio.$numberDecimal).toFixed(2)}`}
            </p>
        </div>
        <div className={styles.divContarBotones}>
            <Edit className={`${styles.iconoEditar} ${styles.icono}`} onClick={handleOpen} />
            <RemoveCircle className={`${styles.iconoEliminar} ${styles.icono}`} onClick={()=>gestionarPeticion('eliminar', producto)} />
        </div>
        <ModalForm 
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            botones={arrayBotones}
            titulo='Modifique los datos.'
            display='flex'
        />
    </li>);
}