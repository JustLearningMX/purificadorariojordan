import { useState } from 'react';
import estilos from '../../../css/Formularios.module.css';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import loginImg from '../../../assets/login.jpg';
import { inputsValidationSchema } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../../config/router/paths';
import { loginDeUsuario } from '../../../data/peticionesMongo/loginUsuario';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { localStorageObj } from '../../../data/localStorage';

export function Login(){
    
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthContext();

    const formik = useFormik({
        initialValues: {
        telefono: '',
        password: '',
        },
        validationSchema: inputsValidationSchema,
        onSubmit: async ({telefono, password}) => {
                        
            setIsLoading(true);
            const data = await loginDeUsuario(telefono, password);
            
            if(data.error) {
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde" : data.message + '. Verifique sus credenciales';
                setIsLoading(false);
                console.log(mensaje);
            } else {
                //Guardamos al USUARIO y su TOKEN en el localStorage
                localStorageObj['usuarioLogueado'](data.user);
                login();
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
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                            helperText={formik.touched.telefono && formik.errors.telefono}
                            className={estilos.input_form}
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
                        />
                        
                        <LoadingButton 
                            loading={isLoading}
                            variant="contained"
                            type='submit'
                            size="large"
                            className={estilos.submittButtonLogin}
                        >
                            Iniciar sesión
                        </LoadingButton>
                </form>
                <p className={estilos.pieForm}>¿No dispone de una cuenta?
                    <span className={estilos.linkRegistrar}> 
                        <Link to={SIGNUP}> Regístrese aquí </Link>
                    </span>
                </p>
            </div>        
            <div className={estilos.formularioImagenContainer}>
                <img className={estilos.formImage} src={loginImg} alt="Inicio de sesión" />
            </div>
        </section>
    );
}