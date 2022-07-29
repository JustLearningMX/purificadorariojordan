import { useState } from 'react';
import estilos from '../../../css/Formularios.module.css';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import loginImg from '../../../assets/login.jpg';
import { inputsValidationSchemaLogin } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { USUARIOS, SIGNUP } from '../../../config/router/paths';
import { loginDeUsuario } from '../../../data/peticionesMongo/loginUsuario';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { localStorageObj } from '../../../data/localStorage';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';

export function Login(){
    
    const [isLoading, setIsLoading] = useState(false);
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });

    const { login } = useAuthContext();

    const formik = useFormik({
        initialValues: {
        telefono: '',
        password: '',
        },
        validationSchema: inputsValidationSchemaLogin,
        onSubmit: async ({telefono, password}) => {
            setIsLoading(true);
            const data = await loginDeUsuario(telefono, password); //Datos preliminares del usuario con su token
            
            if(data.error) {
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde" : data.message + '. Verifique sus credenciales';                
                setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });
                setIsLoading(false);
            } else {
                //Guardamos al USUARIO y su TOKEN en el localStorage
                const mensaje = "Ingresó con éxito al sistema. Bienvenido nuevamente.";
                localStorageObj['usuarioLogueado'](data.user);
                setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                setTimeout(()=>{
                    login();
                },1800);          
            }
        },
    });

    return (
        <section className={estilos.formularioContainer}>
            <div className={estilos.ingresarDatos}>
                <h3 className={estilos.tituloForm}>Inicie sesión</h3>
                <p className={estilos.leyendaForm}>Acceda a su información y conozca sus compras</p>
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
                <p className={estilos.pieForm}>¿No dispone de una cuenta?
                    <span className={estilos.linkRegistrar}> 
                        <Link to={USUARIOS + SIGNUP}> Regístrese aquí </Link>
                    </span>
                </p>
            </div>        
            <div className={estilos.formularioImagenContainer}>
                <img className={estilos.formImage} src={loginImg} alt="Inicio de sesión" />
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