/**Componente que renderiza a los Usuarios de tipo Cliente */
import { Usuarios } from './Usuarios';

export function Empleados(){
    return (
        <>
            <Usuarios 
                tipo_usuario='admin' 
            />
        </>
    );
}