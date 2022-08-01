import estilos from '../../../css/Formularios.module.css';
import stylesDashboard from '../../../css/usuarios/Dashboard.module.css';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { inputsValidationSchemaDashDatos } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { updateUsuario } from '../../../data/peticionesMongo/updateUsuario';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import { localStorageObj } from '../../../data/localStorage';
import { useAuthContext } from '../../../hooks/useAuthContext';

export function DashDatos() {

    const { isUserUpdate, setIsUserUpdate } = useAuthContext();

    const user = JSON.parse(window.localStorage.getItem("UsuarioPurificadora"));
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
    
    const [usuario, setUsuario] = useState(user);

    useEffect(()=> {
        if(isUserUpdate){
            setUsuario(JSON.parse(window.localStorage.getItem("UsuarioPurificadora")));
            setIsUserUpdate(false);
        }
    }, [isUserUpdate, setIsUserUpdate]);

    const [isLoading, setIsLoading] = useState(false);
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    const formik = useFormik({
        
        initialValues: {
            nombre: usuario.nombre ? usuario.nombre : '',
            apellido: usuario.apellidos ? usuario.apellidos : '',
            tipo: usuario.tipo ? usuario.tipo : '',
            email: usuario.email ? usuario.email : '',
            telefono: usuario.telefono ? usuario.telefono : '',
        },
        validationSchema: inputsValidationSchemaDashDatos,
        onSubmit: async ({nombre, apellido, tipo, email, telefono}) => {

            setIsLoading(true);
            const body = {nombre, apellidos: apellido, tipo, email, telefono};

            const data = await updateUsuario(body);
            
            if(data.error) {
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
                setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });                
                setIsLoading(false);
            } else {                
                userToken.email = email;
                userToken.telefono = telefono;
                localStorageObj['usuario'](data.usuario);
                localStorageObj['usuarioLogueado'](userToken);
                setIsUserUpdate(true);
                const mensaje = data.message;
                setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                setIsLoading(false);
            }
        },
    });

    return(
        <section className={estilos.formularioContainer}>
            <div className={`${estilos.ingresarDatos} ${estilos.containerRegistro} ${stylesDashboard.formularios_dashboard}`}>
                <h3 className={estilos.tituloForm}>Datos personales</h3>
                {/* <p className={estilos.leyendaForm}>Datos esenciales.</p> */}
                <form className={estilos.solicitar_form} onSubmit={formik.handleSubmit}>
                    <TextField 
                        id="nombre" 
                        name="nombre"
                        label="Nombre" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                        className={estilos.input_form}
                    />

                    <TextField 
                        id="apellido" 
                        name="apellido"
                        label="Apellido" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                        helperText={formik.touched.apellido && formik.errors.apellido}
                        className={estilos.input_form}
                    />     

                    <TextField 
                        id="tipo" 
                        name="tipo"
                        label="Tipo de usuario" 
                        variant="filled"
                        type='text'
                        size="small"
                        disabled
                        value={formik.values.tipo}
                        onChange={formik.handleChange}
                        error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                        helperText={formik.touched.tipo && formik.errors.tipo}
                        className={estilos.input_form}
                    />                  

                    <TextField 
                        id="email" 
                        name="email"
                        label="Correo electrónico" 
                        variant="filled"
                        type='email'
                        size="small"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        className={estilos.input_form}
                    />         

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
                    />  
                    
                    <LoadingButton 
                        loading={isLoading}
                        variant="contained"
                        type='submit'
                        size="large"
                        className={estilos.submittButtonRegister}
                        sx={{marginTop: '.7rem'}}
                    >
                        Actualizar
                    </LoadingButton>
                </form>
            </div>
            {cargarSnackBar(dataSnackBar)}
        </section>
    );
}

function cargarSnackBar({mensaje, severity, countOpens}){    
    if(countOpens > 0) {
        return <CustomizedSnackbars mensaje={mensaje} severity={severity} countOpens={countOpens} />
    }
}