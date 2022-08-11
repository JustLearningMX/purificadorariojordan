/**FUNCIÓN QUE R4EALIZA UNA PETICIÓN HTTP DEL TIPO POST
 * A LA API PARA AGREGAR UN NUEVO USUARIO
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function signupDeUsuario(body) {
     
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

     //Cuerpo de la petición al backend
    //  const body = { 
    //     "nombre": nombre, 
    //     "apellidos": apellido, 
    //     "email": email, 
    //     "telefono": telefono, 
    //     "password": password,
    //  };

     //Si es usuario Admin, puede crear todo tipo de usuarios
    //  const tokenUsuario = 'Bearer ' + userToken.token;
     const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
     
     try {
         const data =  await requestApi('/usuarios/signup', 'POST', body, tokenUsuario);
         
         return data;
 
     } catch (e) {
         return {error: true, message: e, servidor: true}
     }
 }