/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO DELETE
 * A LA API PARA ELIMINAR UN PRODUCTO */

 import { requestApi } from '../../utils/httpClient';

export async function deleteSucursal(id){
     
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

   const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
   
   try {
      const data = await requestApi(`/sucursales/${id}`, 'DELETE', null, tokenUsuario);
      
      return data;

   } catch (e) {
      return {error: true, message: e, servidor: true}
   }

}