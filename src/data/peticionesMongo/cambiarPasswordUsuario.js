/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO PUT
 * A LA API PARA CAMBIAR LA CONTRASEÑA DE UN USUARIO */

 import { requestApi } from '../../utils/httpClient';

export async function cambiarPasswordUsuario(body){
     
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

     const tokenUsuario = userToken ? 'Bearer ' + userToken.token : '';
     
     try {
        const data = await requestApi('/usuarios/newpassword', 'PUT', body, tokenUsuario);
         
        return data;
 
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }

}