export class Usuario 
{
    id;
    nombre;
    apellidos;
    tipo;
    email;
    telefono;
    rfc;
    ciudad;
    estado;
    cp;
    telefonoRecuperacion;
    direccion;
    emailRecuperacion;

    constructor(id, nombre, apellidos, tipo, email, telefono, rfc, ciudad, estado, cp, telefonoRecuperacion, direccion, emailRecuperacion){

        this.id = id ? id : null;;
        this.nombre = nombre ? nombre : null;
        this.apellidos = apellidos ? apellidos : null;
        this.tipo = tipo ? tipo : null;
        this.email = email ? email : null;
        this.telefono = telefono ? telefono : null;
        this.rfc = rfc ? rfc : null;
        this.ciudad = ciudad ? ciudad : null;
        this.estado = estado ? estado : null;
        this.cp = cp ? cp : null;
        this.telefonoRecuperacion = telefonoRecuperacion ? telefonoRecuperacion : null;
        this.direccion = direccion ? direccion : null;
        this.emailRecuperacion = emailRecuperacion ? emailRecuperacion : null;
    }

}