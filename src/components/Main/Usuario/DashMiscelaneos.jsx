import estilos from '../../../css/Formularios.module.css';
import stylesDashboard from '../../../css/usuarios/Dashboard.module.css';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { inputsValidationSchemaDashMiscelaneos } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { updateUsuario } from '../../../data/peticionesMongo/updateUsuario';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import { localStorageObj } from '../../../data/localStorage';
import { useAuthContext } from '../../../hooks/useAuthContext';

export function DashMiscelaneos() {
    const { isUserUpdate, setIsUserUpdate } = useAuthContext();

    const user = JSON.parse(window.localStorage.getItem("UsuarioPurificadora"));
    
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
            emailRecuperacion: usuario.emailRecuperacion ? usuario.emailRecuperacion : '',
            telefonoRecuperacion: usuario.telefonoRecuperacion ? usuario.telefonoRecuperacion : '',
        },
        validationSchema: inputsValidationSchemaDashMiscelaneos,
        onSubmit: async ({emailRecuperacion, telefonoRecuperacion}) => {

            setIsLoading(true);
            let body = {};

            body.emailRecuperacion = emailRecuperacion ? emailRecuperacion : '\xa0';
            body.telefonoRecuperacion = telefonoRecuperacion ? telefonoRecuperacion : '\xa0';

            if(body){
                const data = await updateUsuario(body);
            
                if(data.error) {
                    const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
                    setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });                
                    setIsLoading(false);
                } else {
                    localStorageObj['usuario'](data.usuario);
                    setIsUserUpdate(true);
                    const mensaje = data.message;
                    setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                    setIsLoading(false);
                }
            } else {
                const mensaje = "Agregue información para actualizar sus datos.";
                setDataSnackBar({mensaje: mensaje, severity: "info", countOpens: (dataSnackBar.countOpens+1) });
                setIsLoading(false);
            }            
        },
    });

    return(
        <section className={estilos.formularioContainer}>
            <div className={`${estilos.ingresarDatos} ${estilos.containerRegistro} ${stylesDashboard.formularios_dashboard}`}>
                <h3 className={estilos.tituloForm}>Varios</h3>
                <form className={estilos.solicitar_form} onSubmit={formik.handleSubmit}>
                    <TextField 
                        id="emailRecuperacion" 
                        name="emailRecuperacion"
                        label="Email Secundario" 
                        variant="filled"
                        type='email'
                        size="small"
                        value={formik.values.emailRecuperacion}
                        onChange={formik.handleChange}
                        error={formik.touched.emailRecuperacion && Boolean(formik.errors.emailRecuperacion)}
                        helperText={formik.touched.emailRecuperacion && formik.errors.emailRecuperacion}
                        className={estilos.input_form}
                    />    

                    <TextField 
                        id="telefonoRecuperacion" 
                        name="telefonoRecuperacion"
                        label="Teléfono Secundario" 
                        variant="filled"
                        type='number'
                        size="small"
                        value={formik.values.telefonoRecuperacion}
                        onChange={formik.handleChange}
                        error={formik.touched.telefonoRecuperacion && Boolean(formik.errors.telefonoRecuperacion)}
                        helperText={formik.touched.telefonoRecuperacion && formik.errors.telefonoRecuperacion}
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