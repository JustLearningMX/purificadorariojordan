/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO POST
 * A LA API PARA GENERAR EL TOKEN DEL USUARIO (AUTENTICACIÓN)
 */

import { requestApi } from '../../utils/httpClient';

export async function loginDeUsuario(telefono, password){
    const body = { "telefono": telefono, "password": password };
    
    try {
        const data =  await requestApi('/usuarios/login', 'POST', body);
        
        return data;

    } catch (e) {
        return {error: true, message: e, servidor: true}
    }
}