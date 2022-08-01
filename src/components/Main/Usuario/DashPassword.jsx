import estilos from '../../../css/Formularios.module.css';
import stylesDashboard from '../../../css/usuarios/Dashboard.module.css';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { inputsValidationSchemaDashPassword } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { cambiarPasswordUsuario } from '../../../data/peticionesMongo/cambiarPasswordUsuario';
import { CustomizedSnackbars } from '../../Varios/SnackBar';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { USUARIOS, LOGIN } from '../../../config/router/paths';

export function DashPassword() {
    const { isAuthenticated, logout } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    const formik = useFormik({
        
        initialValues: {
            viejoPassword: '',
            nuevoPassword: '',
            nuevoPasswordAgain: '',
        },
        validationSchema: inputsValidationSchemaDashPassword,
        onSubmit: async (values) => {

            setIsLoading(true);

            delete values.nuevoPasswordAgain;
            const data = await cambiarPasswordUsuario(values);
        
            if(data.error) {
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
                setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });                
                setIsLoading(false);
            } else {
                const mensaje = data.message + '. Vuelva a iniciar sesión.';
                setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                setTimeout(()=>{
                    logout();
                },1300);
            }
        },
    });

    if(!isAuthenticated) {
        return <Navigate to={(USUARIOS + LOGIN)} />
    }

    return(
        <section className={estilos.formularioContainer}>
            <div className={`${estilos.ingresarDatos} ${estilos.containerRegistro} ${stylesDashboard.formularios_dashboard}`}>
                <h3 className={estilos.tituloForm}>Cambiar Contraseña</h3>
                <form className={estilos.solicitar_form} onSubmit={formik.handleSubmit}>
                    <TextField 
                        id="viejoPassword" 
                        name="viejoPassword"
                        label="Contraseña actual" 
                        variant="filled"
                        type='password'
                        size="small"
                        value={formik.values.viejoPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.viejoPassword && Boolean(formik.errors.viejoPassword)}
                        helperText={formik.touched.viejoPassword && formik.errors.viejoPassword}
                        className={estilos.input_form}
                    />    

                    <TextField 
                        id="nuevoPassword" 
                        name="nuevoPassword"
                        label="Nueva contraseña" 
                        variant="filled"
                        type='password'
                        size="small"
                        value={formik.values.nuevoPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.nuevoPassword && Boolean(formik.errors.nuevoPassword)}
                        helperText={formik.touched.nuevoPassword && formik.errors.nuevoPassword}
                        className={estilos.input_form}
                    />  

                    <TextField 
                        id="nuevoPasswordAgain" 
                        name="nuevoPasswordAgain"
                        label="Repetir contraseña" 
                        variant="filled"
                        type='password'
                        size="small"
                        value={formik.values.nuevoPasswordAgain}
                        onChange={formik.handleChange}
                        error={formik.touched.nuevoPasswordAgain && Boolean(formik.errors.nuevoPasswordAgain)}
                        helperText={formik.touched.nuevoPasswordAgain && formik.errors.nuevoPasswordAgain}
                        // className={estilos.input_form}
                    />
                    
                    <LoadingButton 
                        loading={isLoading}
                        variant="contained"
                        type='submit'
                        size="large"
                        className={estilos.submittButtonRegister}
                        sx={{marginTop: '.7rem'}}
                    >
                        Cambiar
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