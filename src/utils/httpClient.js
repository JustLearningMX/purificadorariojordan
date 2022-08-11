//REALIZA UN FETCH A LA API, RECIBE EL PATH AL QUE DESEA ACCEDER Y
//EL TIPO DE SOLICITUD QUE DESEA IMPLEMENTAR

//función asíncrona
export async function requestApi(path, req, arrBody, token) {

  const API = "https://purificadora-rio-jordan-api.herokuapp.com/v1"; //Base de la API a consumir
  // const API = "http://localhost:4015/v1";

  const body = (req === "POST" || req === "PUT" || req === "DELETE") ? arrBody : {};

  if(req === "GET"){
    
  //path y tipo de solicitud
    const resultado = await fetch(API + path, {
      //Se concatena api y path
      mode: "cors",
      method: req, //tipo de petición
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Authorization": token,
      }),
    }); //Si todo OK se retorna el JSON con los resultados, si no el error
    return await resultado.json();
  }
  else if(req === "POST")
  {      
    const resultado = await fetch(API + path, {
      //Se concatena api y path
      mode: "cors",
      method: req, //tipo de petición
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",        
        "Authorization": token,
      }),
    }); 
    //Retornamos los datos recibidos de la petición
    return await resultado.json();
  }
  else if(req === "PUT")
  {
      // usuario: arrUsuario ? JSON.stringify(arrUsuario) : null,
    const resultado = await fetch(API + path, {
      //Se concatena api y path
      mode: "cors",
      method: req, //tipo de petición
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",        
        "Authorization": token,
      }),
    }); 
    //Retornamos los datos recibidos de la petición
    return await resultado.json();
  }
  else if(req === "DELETE")
  {
      // usuario: arrUsuario ? JSON.stringify(arrUsuario) : null,
    const resultado = await fetch(API + path, {
      //Se concatena api y path
      mode: "cors",
      method: req, //tipo de petición      
      body: body ? JSON.stringify(body) : body,
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",        
        "Authorization": token,
      }),
    }); 
    //Retornamos los datos recibidos de la petición
    return await resultado.json();
  }
} 