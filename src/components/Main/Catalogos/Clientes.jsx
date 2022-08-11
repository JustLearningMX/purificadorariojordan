/**Componente que renderiza a los Usuarios de tipo Cliente */
import { Usuarios } from './Usuarios';

export function Clientes(){
    return (
        <>
            <Usuarios 
                tipo_usuario='cliente' 
            />
        </>
    );
}