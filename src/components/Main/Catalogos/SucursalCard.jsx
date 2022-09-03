import styles from '../../../css/usuarios/Catalogos.module.css';
import { Edit }  from '@styled-icons/material-rounded';
import { RemoveCircle }  from '@styled-icons/material';
import { ModalForm } from '../../Varios/ModalForm';
import { Dialogs } from '../../Varios/Dialogs';
import { useCallback, useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Done } from '@styled-icons/material';
import { Clear } from '@styled-icons/material';
import { Peticiones } from '../../../data/peticionesMongo/peticionesHTTP'
import { CustomizedSnackbars } from '../../Varios/SnackBar';

/**Botones para la ventana modal Actualizar */
const arrayBotones = [ 
    {nombre: 'Cancelar', color: red, icon: <Clear />}
];

/**Botones para la ventana modal Eliminar */
const arrayBotonesEliminar = [
    {nombre: 'Eliminar', color: blue, icon: <Done />}, 
    {nombre: 'Cancelar', color: red, icon: <Clear />}
];

export function SucursalCard({sucursal, setSucursales}){
    
    const [dataSnackBar, setDataSnackBar] = useState({ //Despliega un mensaje temporal
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    /**Opciones para la Modal Actualizar */
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No');
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = (value) => {
        setOpen(false);
        if(value === "Si") setSelectedValue(value);
    }

    /**Opciones para la Modal Eliminar */
    const [open_, setOpen_] = useState(false);
    const [selectedValue_, setSelectedValue_] = useState({opcion: 'Cancelar', sucursal: null});
    const handleOpen_ = ()=>{
        setOpen_(true);
    }
    const handleClose_ = (sucursal, value) => {
        setOpen_(false);
        if(value === "Eliminar") {
            setSelectedValue_({opcion: 'Eliminar', sucursal: sucursal});
        }
    }

    const eliminarItem = useCallback( async ()=>{
        const { id } = selectedValue_.sucursal;
        const data = await Peticiones.deleteSucursal(id);
        if(data.error){
            const mensaje = data.servidor ? "Error en el servidor. Intente más tarde" + data.message : 'Error al eliminar el Item. ' + data.message;                
            setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });
        } else {
            const mensaje = "Item eliminado correctamente.";
            setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
            setSelectedValue_({opcion: 'Cancelar', sucursal: null});
            setTimeout(()=>{
                setSucursales(null);
            },1200);
        }
    }, [selectedValue_.sucursal, setSucursales, dataSnackBar.countOpens]);

    /**Si se desea eliminar un Item */
    useEffect(()=>{
        
        if(selectedValue_.opcion === 'Eliminar'){
            eliminarItem();
        }
    },[selectedValue_.opcion, eliminarItem]);

    return (<li className={styles.itemProductos}>
        
        <div className={styles.divDatosContainer}>
            <p className={styles.nombreProducto}>
                {sucursal.nombre}
            </p>
            <p className={styles.cantidadProducto}>
                {sucursal.ciudad ? sucursal.ciudad : ''}
            </p>
            <p className={styles.precioProducto}>
                {sucursal.telefono ? sucursal.telefono : ''}
            </p>
        </div>
        <div className={styles.divContarBotones}>
            <Edit className={`${styles.iconoEditar} ${styles.icono}`} onClick={handleOpen} />
            <RemoveCircle className={`${styles.iconoEliminar} ${styles.icono}`} onClick={handleOpen_} />
        </div>
        <ModalForm 
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            botones={arrayBotones}
            titulo='Modifique los datos.'
            display='flex'
            array={sucursal}
            peticion='updateSucursal'
            setData={setSucursales}
            opcionBtn='Modificar'
        />
        <Dialogs 
            selectedValue={selectedValue_}
            open={open_}
            onClose={(value)=>handleClose_(sucursal, value)}
            botones={arrayBotonesEliminar}
            titulo={`¿Confirma que desea eliminar la sucursal ${sucursal.nombre}?`}
            display='flex'
        />
        {cargarSnackBar(dataSnackBar)} 
    </li>);
}


/**Funcion que carga ventanita de los mensajes temporales */
function cargarSnackBar({mensaje, severity, countOpens}){    
    if(countOpens > 0) {
        return <CustomizedSnackbars mensaje={mensaje} severity={severity} countOpens={countOpens} />
    }
}