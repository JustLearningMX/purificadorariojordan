/**
 * FUNCIÓN QUE REALIZA SOLICITUD A LA BD DE
 * LOS DATOS DE UN USUARIO LOGUEADO Y
 * LO GUARDA EN /CONFIG/USUARIO usuario.datos
 */
 import { requestApi } from '../../utils/httpClient';
 
 export async function getUsuario(token) {
     try {                            
 
         const data = await requestApi('/usuarios', 'GET', null, token);
 
         if(data.error) { //Si hubo un error
             console.log('Hubo un error: ', data.error);      
         } else { //Si todo salió bien 
             
             //Guardamos los datos del Usuario en el localStorage
             window.localStorage.setItem(
                 "usuarioDatos", JSON.stringify(data)
             );
         }
     } catch (error) {
         console.log('Hubo un error: ', error);        
     }    
 }