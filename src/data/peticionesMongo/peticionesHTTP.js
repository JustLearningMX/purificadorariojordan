import { updateUsuario } from './updateUsuario';
import { updateProducto } from './updateProducto';
import { deleteProducto } from './deleteProducto';
import { crearProducto } from './crearProducto';

export const Peticiones = {
    updateUsuario: (body)=> updateUsuario(body),
    crearProducto: (body)=> crearProducto(body),
    updateProducto: (body)=> updateProducto(body),
    deleteProducto: (id)=> deleteProducto(id),
};