/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO PUT
 * A LA API PARA ACTUALIZAR LOS DATOS PARCIALES O COMPLETO
 * DE UNA SUCURSAL */

 import { requestApi } from '../../utils/httpClient';
 
 export async function updateSucursal(body) {

   const { id } = body;
   delete body.id;

   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

   const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
   
   try {
      const data = await requestApi(`/sucursales/${id}`, 'PUT', body, tokenUsuario);
      
      return data;

   } catch (e) {
      return {error: true, message: e, servidor: true}
   }
 }