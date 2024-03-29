/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER TODAS LAS VENTAS DE TODOS LOS  
 * USUARIOS, ASI COMO SUS DATOS DETALLADOS
 */

 import { requestApi } from '../../../utils/httpClient';
 
 export async function getVentasTodos() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
   const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';

   try {

      const data = await requestApi(`/reportes/ventas/todos`, 'GET', null, tokenUsuario, null);
      
      return data;
      
   } catch (e) {
      return {error: true, message: e, servidor: true}
   }    
 }