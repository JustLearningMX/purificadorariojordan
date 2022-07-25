import estilos from '../../../css/Formularios.module.css';
import { TextField, Button } from '@mui/material';
import login from '../../../assets/login.jpg';
import { inputsValidationSchema } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../../config/router/paths';
// import { reCAPTCHA } from "react-google-recaptcha";
// import { useRef } from 'react';


export function Login(){
    
    // const captchaRef = useRef(null);

    const formik = useFormik({
        initialValues: {
        telefono: '',
        password: '',
        },
        validationSchema: inputsValidationSchema,
        onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
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

                        {/* <reCAPTCHA 
                            sitekey={process.env.REACT_APP_SITE_KEY}
                            ref={captchaRef}
                        /> */}
                        <Button className={estilos.submittButtonLogin} variant="contained" type='submit'>Iniciar sesión</Button>
                </form>
                <p className={estilos.pieForm}>¿No dispone de una cuenta?
                    <span className={estilos.linkRegistrar}> 
                        <Link to={SIGNUP}> Regístrese aquí </Link>
                    </span>
                </p>
            </div>        
            <div className={estilos.formularioImagenContainer}>
                <img className={estilos.formImage} src={login} alt="Inicio de sesión" />
            </div>
        </section>
    );
}