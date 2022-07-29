import { useState } from 'react';
import estilos from '../../../css/Formularios.module.css';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import registerImg from '../../../assets/register.jpg';
import { inputsValidationSchemaSignup } from '../../../config/inputsValidationSchema';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { USUARIOS, LOGIN } from '../../../config/router/paths';
import { signupDeUsuario } from '../../../data/peticionesMongo/signupUsuario';

export function Signup() {
    
    const [isLoading, setIsLoading] = useState(false);
    
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            password: '',
        },
        validationSchema: inputsValidationSchemaSignup,
        onSubmit: async ({nombre, apellido, telefono, email, password}) => { 
            
                        
            setIsLoading(true);
            const data = await signupDeUsuario(nombre, apellido, telefono, email, password);
            
            if(data.error) {
                const mensaje = data.servidor ? "Error en el servidor. Intente más tarde. " + data.message : data.message;
                setIsLoading(false);
                console.log(mensaje);
            } else {                
                setIsLoading(false);
                console.log(data.message + '. Inicie sesión con sus credenciales');
                //Redireccionamos al Login
                navigate(`${USUARIOS}${LOGIN}`, { replace: true });
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
        </section>
    );
}