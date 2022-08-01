import estilos from '../../../css/Formularios.module.css';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { inputsValidationSchemaDashDireccion } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { updateUsuario } from '../../../data/peticionesMongo/updateUsuario';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import { localStorageObj } from '../../../data/localStorage';
import { useAuthContext } from '../../../hooks/useAuthContext';

export function DashDireccion() {
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
            direccion: usuario.direccion ? usuario.direccion : '',
            ciudad: usuario.ciudad ? usuario.ciudad : '',
            estado: usuario.estado ? usuario.estado : '',
            cp: usuario.cp ? usuario.cp : '',
            rfc: usuario.rfc ? usuario.rfc : '',
        },
        validationSchema: inputsValidationSchemaDashDireccion,
        onSubmit: async ({direccion, ciudad, estado, cp, rfc}) => {

            setIsLoading(true);
            let body = {};
            body.direccion = direccion ? direccion : '\xa0';
            body.ciudad = ciudad ? ciudad : '\xa0';
            body.estado = estado ? estado : '\xa0';
            body.cp = cp ? cp : '\xa0';
            body.rfc = rfc ? rfc : '\xa0';

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
            <div className={`${estilos.ingresarDatos} ${estilos.containerRegistro}`}>
                <h3 className={estilos.tituloForm}>Dirección</h3>
                <form className={estilos.solicitar_form} onSubmit={formik.handleSubmit}>
                    <TextField 
                        id="direccion" 
                        name="direccion"
                        label="Dirección" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.direccion}
                        onChange={formik.handleChange}
                        error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                        helperText={formik.touched.direccion && formik.errors.direccion}
                        className={estilos.input_form}
                        autoFocus
                    />    

                    <TextField 
                        id="estado" 
                        name="estado"
                        label="Estado" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.estado}
                        onChange={formik.handleChange}
                        error={formik.touched.estado && Boolean(formik.errors.estado)}
                        helperText={formik.touched.estado && formik.errors.estado}
                        className={estilos.input_form}
                    /> 

                    <TextField 
                        id="ciudad" 
                        name="ciudad"
                        label="Ciudad" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.ciudad}
                        onChange={formik.handleChange}
                        error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
                        helperText={formik.touched.ciudad && formik.errors.ciudad}
                        className={estilos.input_form}
                    />                  

                    <TextField 
                        id="cp" 
                        name="cp"
                        label="Código Postal" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.cp}
                        onChange={formik.handleChange}
                        error={formik.touched.cp && Boolean(formik.errors.cp)}
                        helperText={formik.touched.cp && formik.errors.cp}
                        className={estilos.input_form}
                    />         

                    <TextField 
                        id="rfc" 
                        name="rfc"
                        label="RFC" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.rfc}
                        onChange={formik.handleChange}
                        error={formik.touched.rfc && Boolean(formik.errors.rfc)}
                        helperText={formik.touched.rfc && formik.errors.rfc}
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