/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO DELETE
 * A LA API PARA ELIMINAR LA CUENTA DE UN USUARIO */

 import { requestApi } from '../../utils/httpClient';

export async function deleteUsuario(body){

   // body = body ? body : null;
     
   const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

   const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
   
   try {
      const data = await requestApi('/usuarios/delete', 'DELETE', body, tokenUsuario);
      
      return data;

   } catch (e) {
      return {error: true, message: e, servidor: true}
   }

}