export class Sucursal 
{
    id;
    nombre;
    telefono;
    direccion;
    ciudad;
    estado;
    cp;

    constructor(id, nombre, telefono, direccion, ciudad, estado, cp){

        this.id = id ? id : null;;
        this.nombre = nombre ? nombre : null;
        this.telefono = telefono ? telefono : null;
        this.direccion = direccion ? direccion : null;
        this.ciudad = ciudad ? ciudad : null;
        this.estado = estado ? estado : null;
        this.cp = cp ? cp : null;
    }

}