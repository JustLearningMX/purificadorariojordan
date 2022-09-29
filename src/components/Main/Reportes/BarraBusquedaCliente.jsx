import { useCallback, useEffect, useState } from "react";
import { getUsuarios } from "../../../data/peticionesMongo/getUsuarios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function BarraBusquedaCliente({setTelefonoCliente}){

    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));   
    const [clientes, setClientes] = useState(null);

    const fetchListaCliente = useCallback( async ()=>{
        
        try {
            const dataClientes = await getUsuarios(userToken.token);

            //Guardamos la lista de clientes para mostrarlo en el buscador
            if(dataClientes.error){//Si hubo error con la BD
            setClientes([{label: 'Error al descargar la lista de clientes...'}]); 
            } 
            else if(!dataClientes.error && dataClientes.usuarios.length > 1){ //Si no hubo error y existe por lo menos un usuario      
            const listaDeClientes = dataClientes.usuarios
                .filter( usuario => usuario.tipo !== 'admin') //Cualquier usuario ya sea Cliente o Empleado, no Admins
                .map( usuario => {return {label: `${usuario.telefono} - ${usuario.nombre} ${usuario.apellidos}`}} );

            setClientes(listaDeClientes);
            }

        } catch (error) {
            console.log('Error al intentar obtener lista de clientes de la BD', error);
        }

    },[userToken.token]);

    useEffect(()=>{
        fetchListaCliente();
    },[fetchListaCliente]);

    //Al dar clic en un usuario
  const handleOnChange = (e, v) => {

    //Guardamos el cliente elegido en la barra de busqueda
    // setValueCliente(v ? v.label : '');

    const telefonoCliente = e.target.textContent.split(' ')[0]; //Se obtiene el tel del cliente
    setTelefonoCliente(telefonoCliente);
  }

    return (
        <Autocomplete
          disablePortal
          autoHighlight={true}
          id="combo-box-demo"
          options={clientes ? clientes : [{label: 'Descargando lista de clientes...'}]}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Cliente" />}
          autoComplete={true}
          size='small'
          onChange={handleOnChange}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        //   inputValue={valueCliente}
        />
    );
    
}