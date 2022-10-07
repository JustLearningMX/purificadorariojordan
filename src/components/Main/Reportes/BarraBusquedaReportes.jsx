import { useCallback, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Peticiones } from '../../../data/peticionesMongo/peticionesHTTP';

export function BarraBusquedaReportes({setDatos, tabla}){

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));   
    const [listado, setListado] = useState(null);
    
    let dataBD = null;
    let itemArray = '';
    if(tabla === 'clientes') {
        dataBD = async () => await Peticiones.getUsuarios(userToken.token);
        itemArray = 'usuarios';
    } else if(tabla === 'productos') {
        dataBD = async () => await Peticiones.getProductos(userToken.token);
        itemArray = 'productos';
    }

    const fetchListado = useCallback( async ()=> {
        
        if(dataBD) {
            try {
                const data = await dataBD();
            
                //Guardamos la lista para mostrarlo en el buscador
                if(data.error){//Si hubo error con la BD
                    setListado([{label: `Error al descargar la lista...`}]); 
                } 
                else if(!data.error && data[itemArray].length > 1){ //Si no hubo error y existe por lo menos un usuario
                    if(itemArray === 'usuarios') {
                        const listaDeClientes = data[itemArray]
                            .filter( usuario => usuario.tipo !== 'admin') //Cualquier usuario ya sea Cliente o Empleado, no Admins
                            .map( usuario => {return {label: `${usuario.telefono} - ${usuario.nombre} ${usuario.apellidos}`}} );
    
                            setListado(listaDeClientes);
                    } else {
                        const listaDeProductos = data[itemArray]
                            // .filter( producto => producto.tipo !== 'admin') //Cualquier usuario ya sea Cliente o Empleado, no Admins
                            .map( producto => {return {label: `${producto.id} - ${producto.nombre}`}} );
    
                            setListado(listaDeProductos);
                    }
                }

            } catch (error) {
                console.log('Error al intentar obtener lista de la BD', error);
            }
        }

    },[dataBD, itemArray]);

    useEffect(()=>{
        if(!listado) fetchListado();
    },[fetchListado, listado]);

    //Al dar clic en un usuario
  const handleOnChange = (e, v) => {

    const nombreItem = e.target.textContent.split(' '); //Se obtiene el tel del cliente
    const idItem = nombreItem[0]; //Se obtiene el tel del cliente

    //Guardamos el nombre del cliente
    let nombreItemCompleto = '';
    for(let i = 2; i < nombreItem.length; i++){
        nombreItemCompleto = `${nombreItemCompleto} ${nombreItem[i]}`
    }
    
    setDatos({nombre: nombreItemCompleto, identificador: idItem});
  }

    return (
        <Autocomplete
          disablePortal
          autoHighlight={true}
          id="combo-box-demo"
          options={listado ? listado : [{label: `Descargando listado de ${tabla}...`}]}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label={tabla} />}
          autoComplete={true}
          size='small'
          onChange={handleOnChange}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        //   inputValue={valueCliente}
        />
    );
    
}