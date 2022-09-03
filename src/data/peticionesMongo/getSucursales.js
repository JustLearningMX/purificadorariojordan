/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER LOS DATOS DE TODAS LAS SUCURSALES.
 * ÚNICAMENTE ADMINS Y EMPLEADOS PUEDEN REALIZAR ESTA PETICIÓN
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function getSucursales(token) {
    
     try {

        const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi('/sucursales', 'GET', null, tokenUsuario);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }