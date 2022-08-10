/**FUNCIÓN QUE R4EALIZA UNA PETICIÓN HTTP DEL TIPO POST
 * A LA API PARA AGREGAR UN NUEVO PRODUCTO  */

 import { requestApi } from '../../utils/httpClient';
 
 export async function crearProducto(body) {
     
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

     //Si es usuario Admin o Empleado, pueden crear productos    
     const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
     
     try {
         const data =  await requestApi('/productos', 'POST', body, tokenUsuario);
         
         return data;
 
     } catch (e) {
         return {error: true, message: e, servidor: true}
     }
 }