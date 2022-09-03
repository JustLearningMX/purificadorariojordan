import { signupDeUsuario } from './signupUsuario'; //Crear usuario
import { updateUsuario } from './updateUsuario';   //Actualizar usuario
import { deleteUsuario } from './deleteUsuario';   //Eliminar usuario

import { crearProducto } from './crearProducto';
import { updateProducto } from './updateProducto';
import { deleteProducto } from './deleteProducto';

import { crearSucursal } from './crearSucursal';
import { updateSucursal } from './updateSucursal';
import { deleteSucursal } from './deleteSucursal';

export const Peticiones = {
    signupUsuario: (body)=> signupDeUsuario(body),
    updateUsuario: (body)=> updateUsuario(body),
    deleteUsuario: (body)=> deleteUsuario(body),

    crearProducto: (body)=> crearProducto(body),
    updateProducto: (body)=> updateProducto(body),
    deleteProducto: (id)=> deleteProducto(id),

    crearSucursal: (body)=> crearSucursal(body),
    updateSucursal: (body)=> updateSucursal(body),
    deleteSucursal: (id)=> deleteSucursal(id),
};