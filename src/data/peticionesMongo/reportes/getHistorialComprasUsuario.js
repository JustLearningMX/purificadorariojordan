/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER TODAS LAS COMPRAS (VENTAS) DE UN USUARIO 
 * EN ESPECIFICO, ASI COMO SUS DATOS DETALLADOS
 */

 import { requestApi } from '../../../utils/httpClient';
 
 export async function getHistorialComprasUsuario() {

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));
   const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';

   try {

      const data = await requestApi(`/reportes/historialDeCompras`, 'GET', null, tokenUsuario);

      return data;
      
   } catch (e) {
      return {error: true, message: e, servidor: true}
   }    
 }