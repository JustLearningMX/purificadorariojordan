import { signupDeUsuario } from './signupUsuario'; //Crear usuario
import { updateUsuario } from './updateUsuario';   //Actualizar usuario
import { deleteUsuario } from './deleteUsuario';   //Eliminar usuario
import { getUsuarios } from './getUsuarios'; //Obtener todos los usuarios

import { crearProducto } from './crearProducto';
import { updateProducto } from './updateProducto';
import { deleteProducto } from './deleteProducto';
import { getProductos } from './getProductos';

import { crearSucursal } from './crearSucursal';
import { updateSucursal } from './updateSucursal';
import { deleteSucursal } from './deleteSucursal';

import { crearVentasEnExcel } from './crearVentasEnExcel';

export const Peticiones = {
    signupUsuario: (body)=> signupDeUsuario(body),
    updateUsuario: (body)=> updateUsuario(body),
    deleteUsuario: (body)=> deleteUsuario(body),
    getUsuarios: (token)=> getUsuarios(token),

    crearProducto: (body)=> crearProducto(body),
    updateProducto: (body)=> updateProducto(body),
    deleteProducto: (id)=> deleteProducto(id),
    getProductos: (token)=> getProductos(token),

    crearSucursal: (body)=> crearSucursal(body),
    updateSucursal: (body)=> updateSucursal(body),
    deleteSucursal: (id)=> deleteSucursal(id),

    crearVentasEnExcel: (pestana, tipoReporte, fechaIni, fechaFin, nombre, identificador, token, nombreDeArchivo) => crearVentasEnExcel(pestana, tipoReporte, fechaIni, fechaFin, nombre, identificador, token, nombreDeArchivo),
};