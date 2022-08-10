export class Producto 
{
    id;
    nombre;
    medida;
    cantidad;
    precio;

    constructor(id, nombre, medida, cantidad, precio){

        this.id = id ? id : null;;
        this.nombre = nombre ? nombre : null;
        this.medida = medida ? medida : null;
        this.cantidad = cantidad ? cantidad : null;
        this.precio = precio ? precio : null;
    }

}