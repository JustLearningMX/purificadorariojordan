import * as yup from 'yup';

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
    apellidos: yup
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

export const inputsValidationSchemaDashPassword = yup.object({
  viejoPassword: yup
    .string()
    .min(8, 'El password debe ser de mínimo 8 caracteres')
    .required('El password es requerido'),
  nuevoPassword: yup
    .string()
    .min(8, 'El password debe ser de mínimo 8 caracteres')
    .required('El nuevo password es requerido'),
  nuevoPasswordAgain: yup
      .string()
      .min(8, 'El password debe ser de mínimo 8 caracteres')
      .oneOf([yup.ref('nuevoPassword'), null], 'El password nuevo debe coincidir')
      .required('El password es requerido'),
});

export const inputsValidationSchemaModificarProductos = yup.object({
  id: yup
    .string(),
  nombre: yup
    .string()
    .min(5, 'El nombre debe ser de mínimo 5 caracteres')
    .required('El nombre es requerido'),
  medida: yup
      .string()
      .min(3, 'La medida debe ser de mínimo 3 caracteres')
      .required('La medida es requerida'),
  cantidad: yup
    .number()
    .required('La cantidad es requerida'),
  precio_: yup
      .number()
      .required('El precio es requerido'),
});

export const inputsValidationSchemaCrearProductos = yup.object({
  id: yup
    .string(),
  nombre: yup
    .string()
    .min(5, 'El nombre debe ser de mínimo 5 caracteres')
    .required('El nombre es requerido'),
  medida: yup
      .string()
      .min(3, 'La medida debe ser de mínimo 3 caracteres')
      .required('La medida es requerida'),
  cantidad: yup
    .number()
    .required('La cantidad es requerida'),
  precio: yup
      .number()
      .required('El precio es requerido'),
});

export const inputsValidationSchemaCrearUsuario = yup.object({
  id: yup
    .string(),
  nombre: yup
    .string()
    .min(3, 'El nombre debe ser de mínimo 3 caracteres')
    .required('El nombre es requerido'),
  apellidos: yup
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
  password: yup
    .string()
    .min(8, 'El password debe ser de mínimo 8 caracteres')
    .required('El password es requerido'),
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
  emailRecuperacion: yup
    .string()
    .email("Formato de email inválido."),
  telefonoRecuperacion: yup
    .string(),
});

export const inputsValidationSchemaCrearModificarSucursal = yup.object({
  id: yup
    .string(),
  nombre: yup
    .string()
    .min(5, 'El nombre debe ser de mínimo 5 caracteres')
    .required('El nombre es requerido'),
  telefono: yup
    .string()
    .matches(phoneRegex, "Número de teléfono inválido. Deben ser 10 números"),
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
});