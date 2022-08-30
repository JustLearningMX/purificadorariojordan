/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER LA CANTIDAD DE GARRAFONES DE 19LTS
 * DE LA ULTIMA COMPRA DE TODOS LOS CLIENTES
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function getInventarioClientes() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
   const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';

   try {

      const data = await requestApi(`/inventarioClientes/`, 'GET', null, tokenUsuario);

      return data;
      
   } catch (e) {
      return {error: true, message: e, servidor: true}
   }    
 }