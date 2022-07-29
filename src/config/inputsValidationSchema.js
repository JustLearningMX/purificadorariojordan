import * as yup from 'yup';

const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
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