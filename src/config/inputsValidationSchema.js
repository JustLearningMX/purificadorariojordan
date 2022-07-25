import * as yup from 'yup';

const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

export const inputsValidationSchema = yup.object({
    telefono: yup
    .string('El teléfono no puede ir vacío')
    .matches(phoneRegex, "Número de teléfono inválido. Deben ser 10 números")
    .required('El teléfono es requerido'),
    password: yup
      .string('El campo password no puede ir vacío')
      .min(8, 'El password debe ser de mínimo 8 caracteres')
      .required('El Password es requerido'),
  });