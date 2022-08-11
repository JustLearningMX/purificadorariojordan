import { signupDeUsuario } from './signupUsuario';
import { updateUsuario } from './updateUsuario';
import { deleteUsuario } from './deleteUsuario';

import { updateProducto } from './updateProducto';
import { deleteProducto } from './deleteProducto';
import { crearProducto } from './crearProducto';

export const Peticiones = {
    signupUsuario: (body)=> signupDeUsuario(body),
    updateUsuario: (body)=> updateUsuario(body),
    deleteUsuario: (body)=> deleteUsuario(body),

    crearProducto: (body)=> crearProducto(body),
    updateProducto: (body)=> updateProducto(body),
    deleteProducto: (id)=> deleteProducto(id),
};