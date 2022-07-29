/**
 * FUNCIÓN QUE CREA UN USUARIO BASADO EN SU CLASE
 */
import { Usuario } from '../classes/Usuario';

export function crearUsuario(
        { id, nombre, apellidos, tipo, email, telefono, 
          rfc, ciudad, estado, cp, telefonoRecuperacion, 
          direccion, emailRecuperacion }
    ) {
    const user = new Usuario(id, nombre, apellidos, tipo, email, telefono, rfc, ciudad, estado, cp, telefonoRecuperacion, direccion, emailRecuperacion);

    return user;
}