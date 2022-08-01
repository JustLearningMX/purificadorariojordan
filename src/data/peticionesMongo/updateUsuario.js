/**FUNCIÓN QUE R4EALIZA UNA PETICIÓN HTTP DEL TIPO PUT
 * A LA API PARA ACTUALIZAR LOS DATOS PARCIALES O COMPLETO
 * DE UN USUARIO */

 import { requestApi } from '../../utils/httpClient';
 
 export async function updateUsuario(body) {
     
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

     const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
     
     try {
        const data = await requestApi('/usuarios/update', 'PUT', body, tokenUsuario);
         
        return data;
 
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }
 }