import { updateUsuario } from './updateUsuario';
import { updateProducto } from './updateProducto';
import { deleteProducto } from './deleteProducto';

export const Peticiones = {
    updateUsuario: (body)=> updateUsuario(body),
    updateProducto: (body)=> updateProducto(body),
    deleteProducto: (id)=> deleteProducto(id),
};