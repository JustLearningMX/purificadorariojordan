export class Usuario 
{
    id;
    nombre;
    apellidos;
    tipo;
    email;
    telefono;
    password;
    direccion;
    ciudad;
    estado;
    cp;
    rfc;
    emailRecuperacion;
    telefonoRecuperacion;

    constructor(id, nombre, apellidos, tipo, email, telefono, password, rfc, ciudad, estado, cp, telefonoRecuperacion, direccion, emailRecuperacion){

        this.id = id ? id : null;;
        this.nombre = nombre ? nombre : null;
        this.apellidos = apellidos ? apellidos : null;
        this.tipo = tipo ? tipo : null;
        this.email = email ? email : null;
        this.telefono = telefono ? telefono : null;
        this.password = password ? password : null;
        this.rfc = rfc ? rfc : null;
        this.ciudad = ciudad ? ciudad : null;
        this.estado = estado ? estado : null;
        this.cp = cp ? cp : null;
        this.telefonoRecuperacion = telefonoRecuperacion ? telefonoRecuperacion : null;
        this.direccion = direccion ? direccion : null;
        this.emailRecuperacion = emailRecuperacion ? emailRecuperacion : null;
    }

}