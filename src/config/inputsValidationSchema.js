import * as yup from 'yup';

const usuario = JSON.parse(window.localStorage.getItem("UsuarioPurificadora"));

const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

const rfcRegex = RegExp(
  /^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/
);

export const inputsValidationSchemaLogin = yup.object({
  telefono: yup
  .string()
  .matches(phoneRegex, "Número de teléfono inválido. Deben ser 10 números")
  .required('El teléfono es requerido'),
  password: yup
    .string()
    .min(8, 'El password debe ser de mínimo 8 caracteres')
    .required('El password es requerido'),
});

export const inputsValidationSchemaSignup = yup.object({
    telefono: yup
    .string()
    .matches(phoneRegex, "Número de teléfono inválido. Deben ser 10 números")
    .required('El teléfono es requerido'),
    password: yup
      .string()
      .min(8, 'El password debe ser de mínimo 8 caracteres')
      .required('El password es requerido'),
    nombre: yup
      .string()
      .min(3, 'El nombre debe ser de mínimo 3 caracteres')
      .required('El nombre es requerido'),
    apellido: yup
      .string()
      .min(3, 'El apellido debe ser de mínimo 3 caracteres')
      .required('El apellido es requerido'),
    email: yup
      .string()
      .email("Formato de email inválido."),
    passwordConfirmation: yup
      .string()
      .min(8, 'El password debe ser de mínimo 8 caracteres')
      .oneOf([yup.ref('password'), null], 'Los passwords deben coincidir')
      .required('El password es requerido'),
  });

  export const inputsValidationSchemaDashDatos = yup.object({
    nombre: yup
      .string()
      .min(3, 'El nombre debe ser de mínimo 3 caracteres')
      .required('El nombre es requerido'),
    apellido: yup
      .string()
      .min(3, 'El apellido debe ser de mínimo 3 caracteres')
      .required('El apellido es requerido'),
    tipo: yup
      .string()
      .required('El tipo de usuario es requerido'),
    email: yup
      .string()
      .email("Formato de email inválido."),
    telefono: yup
      .string()
      .matches(phoneRegex, "Número de teléfono inválido. Deben ser 10 números")
      .required('El teléfono es requerido'),
  });

  export const inputsValidationSchemaDashDireccion = yup.object({
    direccion: yup
      .string(),
    ciudad: yup
      .string(),
    estado: yup
      .string(),
    cp: yup
      .string()
      .min(5, 'El CP deben ser 5 números')
      .max(5, 'El CP deben ser 5 números'),
    rfc: yup
      .string()
      .matches(rfcRegex, "Ingrese un RFC completo, incluya homoclave"),
  });

  export const inputsValidationSchemaDashMiscelaneos = yup.object({
    emailRecuperacion: yup
      .string()
      .email("Formato de email inválido."),
    telefonoRecuperacion: yup
      .string(),
  });