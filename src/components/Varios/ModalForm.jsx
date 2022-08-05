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
import { inputsValidationSchemaLogin } from '../../config/inputsValidationSchema';
import { useState } from 'react';
import estilos from '../../css/Formularios.module.css';

export function ModalForm(props) {

    const { onClose, selectedValue, open } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const formik = useFormik({
        initialValues: {
        telefono: '',
        password: '',
        },
        validationSchema: inputsValidationSchemaLogin,
        onSubmit: async ({telefono, password}) => {
            // setIsLoading(true);
            // const data = await loginDeUsuario(telefono, password); //Datos preliminares del usuario con su token
            
            // if(data.error) {
            //     const mensaje = data.servidor ? "Error en el servidor. Intente más tarde" : data.message + '. Verifique sus credenciales';                
            //     setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });
            //     setIsLoading(false);
            // } else {
            //     //Guardamos al USUARIO y su TOKEN en el localStorage
            //     const mensaje = "Ingresó con éxito al sistema. Bienvenido nuevamente.";
            //     localStorageObj['usuarioLogueado'](data.user);
            //     setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
            //     setTimeout(()=>{
            //         login();
            //     },1800);          
            // }
        },
    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{props.titulo}</DialogTitle>
            <form className={estilos.solicitar_form} onSubmit={formik.handleSubmit}>
                <TextField 
                    id="telefono" 
                    name="telefono"
                    label="Telefono" 
                    variant="filled"
                    type='number'
                    size="small"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                    helperText={formik.touched.telefono && formik.errors.telefono}
                    className={estilos.input_form}
                    autoFocus
                />

                <TextField 
                    id="password" 
                    name="password" 
                    label="Password" 
                    type='password'
                    variant="filled"                            
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    className={estilos.input_form}
                    size="small"
                />
                
                <LoadingButton 
                    loading={isLoading}
                    variant="contained"
                    type='submit'
                    size="large"
                    className={estilos.submittButtonLogin}
                    sx={{marginTop: '.7rem'}}
                >
                    Iniciar sesión
                </LoadingButton>
            </form>
            <List sx={{ pt: 0, display: props.display}}>
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
        </Dialog>
    );
}