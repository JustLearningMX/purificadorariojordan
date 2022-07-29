/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER LOS DATOS DEL USUARIO YA AUTENTICADO
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function getUsuario(token) {
     try {

        const tokenUsuario = 'Bearer ' + token; 
        const data = await requestApi('/usuarios', 'GET', null, tokenUsuario);

        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }