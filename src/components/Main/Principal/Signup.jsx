import { useState, useRef } from 'react';
import estilos from '../../../css/Formularios.module.css';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import registerImg from '../../../assets/register.jpg';
import { inputsValidationSchemaSignup } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { USUARIOS, LOGIN } from '../../../config/router/paths';
import { signupDeUsuario } from '../../../data/peticionesMongo/signupUsuario';
import { CustomizedSnackbars } from '../../../components/Varios/SnackBar';
import ReCAPTCHA from "react-google-recaptcha";

export function Signup() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [dataSnackBar, setDataSnackBar] = useState({
        mensaje: null,
        severity: null,
        countOpens: 0
    });
    
    let navigate = useNavigate();
    const captchaRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellidos: '',
            telefono: '',
            email: '',
            password: '',
            recaptcha: ''
        },
        validationSchema: inputsValidationSchemaSignup,
        onSubmit: async (datosForm) => { 
            const body = {
                nombre: datosForm.nombre,
                apellidos: datosForm.apellidos,
                telefono: datosForm.telefono,
                email: datosForm.email,
                password: datosForm.password,
            };

            console.log(datosForm)
                        
            setIsLoading(true);
            //Peticion a la API
            const data = await signupDeUsuario(body);
            
            //Si la peticion retorno un error
            if(data.error) {
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
                setDataSnackBar({mensaje: mensaje, severity: "error", countOpens: (dataSnackBar.countOpens+1) });                
                setIsLoading(false);
            } else { //Si la peticion fue correcta y se dio de alta al usuario
                const mensaje = data.message + '. Inicie sesión con sus credenciales';                
                setDataSnackBar({mensaje: mensaje, severity: "success", countOpens: (dataSnackBar.countOpens+1) });
                setTimeout(()=>{ //Redirigir a login
                    navigate(`${USUARIOS}${LOGIN}`, { replace: true });
                },1800);  
            }
        },
    });

    return (
        <section className={estilos.formularioContainer}>
            <div className={`${estilos.ingresarDatos} ${estilos.containerRegistro}`}>
                <h3 className={estilos.tituloForm}>Regístrese</h3>
                <p className={estilos.leyendaForm}>Y goce de los beneficios que tenemos para usted.</p>
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
                        autoFocus
                    />

                    <TextField 
                        id="apellidos" 
                        name="apellidos"
                        label="Apellidos" 
                        variant="filled"
                        type='text'
                        size="small"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                        helperText={formik.touched.apellidos && formik.errors.apellidos}
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
                        id="password" 
                        name="password" 
                        label="Contraseña" 
                        type='password'
                        variant="filled"                            
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        className={estilos.input_form}
                        size="small"
                    />

                    <TextField 
                        id="passwordConfirmation" 
                        name="passwordConfirmation" 
                        label="Repetir contraseña" 
                        type='password'
                        variant="filled"                            
                        value={formik.values.passwordConfirmation}
                        onChange={formik.handleChange}
                        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                        helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                        className={estilos.input_form}
                        size="small"
                    />

                    <div className={estilos.reCaptcha__container}>
                        < ReCAPTCHA 
                            sitekey={process.env.REACT_APP_SITE_KEY}
                            ref={captchaRef}
                        />
                    </div>
                    
                    <LoadingButton 
                        loading={isLoading}
                        variant="contained"
                        type='submit'
                        size="large"
                        className={estilos.submittButtonRegister}
                        sx={{marginTop: '.7rem'}}
                    >
                        Registrar
                    </LoadingButton>
                </form>
                <p className={estilos.pieForm}>Ya dispone de una cuenta?
                    <span className={estilos.linkRegistrar}> 
                        <Link to={USUARIOS + LOGIN}> Inicie sesión aquí </Link>
                    </span>
                </p>
            </div>        
            <div className={`${estilos.formularioImagenContainer} ${estilos.containerRegistro}`}>
                <img className={estilos.formImage} src={registerImg} alt="Registrar usuario nuevo" />
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