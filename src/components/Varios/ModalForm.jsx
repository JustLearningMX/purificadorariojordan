import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { inputsValidationSchemaModificarProductos } from '../../config/inputsValidationSchema';
import { inputsValidationSchemaCrearProductos } from '../../config/inputsValidationSchema';
import { useState, useEffect, useCallback } from 'react';
import estilos from '../../css/Formularios.module.css';
import { Peticiones } from '../../data/peticionesMongo/peticionesHTTP';
import { CustomizedSnackbars } from '../../components/Varios/SnackBar';

/**Ventana Modal para realizar Actualizaciones del CRUD de una tabla */
export function ModalForm(props) {

    const schema = props.opcionBtn === 'Modificar' ? inputsValidationSchemaModificarProductos : inputsValidationSchemaCrearProductos;
    const { onClose, selectedValue, open, setOpen } = props; //Props de la ventana modal
    const [isLoading, setIsLoading] = useState(false); //Deshabilita el boton Actualizar
    const [arrayEntries, setArrayEntries] = useState(null); //Guarda un JSON en un array de arrays
    const [valoresIniciales, setValoresIniciales] = useState(null); //Valores iniciales para el formulario
    const [dataSnackBar, setDataSnackBar] = useState({ //Despliega un mensaje temporal
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    /**Toma un JSON y Crea un nuevo arreglo de arreglos con las Clave-Valor del JSON  */
    const nuevoArreglo = useCallback(()=>{
        const newProduct = {...props.array};

        if(newProduct.createdAt)
                delete newProduct.createdAt;

            if(newProduct.updatedAt)
                delete newProduct.updatedAt;
            
            if(newProduct.precio){                
                newProduct.precio_ = Number(newProduct.precio.$numberDecimal);
                delete newProduct.precio
            }

            return Object.entries(newProduct);
            
    },[props.array]);

    /**Al iniciar el componente, verifica si existe la variable de Array de Arrays,
     * Si aun no, la crea; si ya, crea los valores iniciales para el formulario*/
    useEffect(()=>{
        if(!arrayEntries){
            setArrayEntries(nuevoArreglo());
        } 
        else {
            const iniciales = {};
            arrayEntries.map((entry)=>{
                iniciales[entry[0]] = entry[1] ? entry[1] : '';
                return null;
            })
            setValoresIniciales(iniciales);
        }
    },[arrayEntries, nuevoArreglo]);

    /**Maneja la opcion al cerrar la ventana Modal */
    const handleClose = () => {
        onClose(selectedValue);
    };

    /**Maneja la opcion al dar clic en boton Cancelar */
    const handleListItemClick = (value) => {
        onClose(value);
    };

    /**Gestion del formulario */
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {...valoresIniciales}, //Se establecen valores iniciales. Se reciben en props y se modifican en un useEffect
        validationSchema: schema, //Validaciones de los campos
        onSubmit: async (values) => { //Se reciben los nuevos datos
            if(values.precio_) { //Ajustamos el campo precio, en caso de existir
                values.precio = values.precio_;
                delete values.precio_;
            }
            setIsLoading(true); //Boton en espera
            const data = await Peticiones[`${props.peticion}`](values); //Peticion a la API
            
            if(data.error) { //Si hubo error
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde" + data.message : `No se pudo ${props.opcionBtn} los datos. ` + data.message;                
                setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });
                setIsLoading(false);
            } else { //Si todo bien
                const opcion = props.opcionBtn === 'Modificar' ? 'modificados' : 'creados';
                const mensaje = `Datos ${opcion} exitosamente.`;
                setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                setTimeout(()=>{
                    setOpen && setOpen(false);
                    props.setProductos(null);
                },1200);
            }
        },
    });

    /**Si ya existen Clave-Valor y los valores iniciales, se renderiza el componente */
    return arrayEntries && valoresIniciales ? (        
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{props.titulo}</DialogTitle>
            <form className={estilos.solicitar_form} onSubmit={formik.handleSubmit}>
                {arrayEntries.map((entry, key)=>{
                    if(String(entry[0]) === 'id' && props.opcionBtn === 'Crear') return null;

                    return <TextField 
                        key={key}
                        id={entry[0]} 
                        name={String([entry[0]])}
                        label={entry[0] === 'precio_' ? 'Precio' : entry[0].charAt(0).toUpperCase() + entry[0].slice(1)} 
                        variant="filled"
                        type={typeof [entry[1]] === 'number' ? 'number' : 'text'}
                        size="small"
                        value={formik.values[entry[0]]}
                        onChange={formik.handleChange}
                        error={formik.touched[entry[0]] && Boolean(formik.errors[entry[0]])}
                        helperText={formik.touched[entry[0]] && formik.errors[entry[0]]}
                        disabled = {entry[0] === 'id' ? true : false}
                    />
                })}                
            
                <List sx={{ pt: 0, display: props.display}}>
                    <LoadingButton 
                        loading={isLoading}
                        variant="contained"
                        type='submit'
                        size="large"
                        className={estilos.submittButtonLogin}
                        sx={{margin: '.7rem 0'}}
                    >
                        {props.opcionBtn}
                    </LoadingButton>
                    {props.botones.map((boton, key) => (
                    <ListItem button onClick={() => handleListItemClick(boton.nombre)} key={key}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: boton.color[100], color: boton.color[600] }}>
                                {boton.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={boton.nombre} />
                    </ListItem>
                    ))}
                </List>
            </form>
            {cargarSnackBar(dataSnackBar)} 
        </Dialog>
    ) : null;
}

/**Funcion que carga ventanita de los mensajes temporales */
function cargarSnackBar({mensaje, severity, countOpens}){    
    if(countOpens > 0) {
        return <CustomizedSnackbars mensaje={mensaje} severity={severity} countOpens={countOpens} />
    }
}