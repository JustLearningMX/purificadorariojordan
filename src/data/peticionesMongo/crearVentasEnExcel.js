/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA GENERAR UN ARCHIVO DE EXCEL CON LAS VENTAS.
 * ÚNICAMENTE ADMINS Y EMPLEADOS PUEDEN REALIZAR ESTA PETICIÓN
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function crearVentasEnExcel(pestana, tipoReporte, fechaIni, fechaFin, nombre, identificador, token, nombreDeArchivo) {

   try {

      const tokenUsuario = 'Bearer ' + token;
      const path = `/reportes/archivos/ventasEnExcel?pestana=${pestana}&tipoReporte=${tipoReporte}&fechaIni=${fechaIni}&fechaFin=${fechaFin}&nombreBuscar=${nombre}&idBuscar=${identificador}`;

      const data = await requestApi(path, 'GET', null, tokenUsuario, true);
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
            a.href = url;
            a.download = `${nombreDeArchivo}`;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again
      
   } catch (e) {
      return {error: true, message: e, servidor: true};
   }    
 }