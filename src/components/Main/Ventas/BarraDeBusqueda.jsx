import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getUsuarios } from '../../../data/peticionesMongo/getUsuarios';
import { getInventarioClientes } from '../../../data/peticionesMongo/getInventarioClientes';

export function BarraDeBusqueda({token, setTelefonoCliente, setCantidadBD}){

  const [users, setUsers] = useState(null) //Todos los usuarios a mostrar en el buscador
  const [listaInventario, setListaInventario] = useState(null);

  useEffect( ()=>{ //Colocamos los usuarios en el buscador
    
    if(!users || users.length < 2){

      async function fetchData() {

        //Obtenemos la lista de usuarios y la lista del inventario por cliente
        const [data, dataInventario] = await Promise.all(
          [getUsuarios(token),
          getInventarioClientes()]
        );

        //Guardamos el inventario de los clientes
        if(!dataInventario.error){
          setListaInventario(dataInventario.datos);
        }

        //Guardamos la lista de usuario para mostrarlo en el buscador
        if(data.error){
          setUsers([{label: 'Error al descargar la lista de clientes...'}]); 
        } else if(!data.error && data.usuarios.length > 1){
          
          let listaDeUsuarios = [];
          data.usuarios.map((usuario)=>{
            const label = {label: `${usuario.telefono} - ${usuario.nombre} ${usuario.apellidos}`};
            listaDeUsuarios.push(label);
            return null;
          });

          setUsers(listaDeUsuarios);
        }
         
      }
      fetchData();      
    }
  }, [users, token]);

  //Al dar clic en un usuario
  const handleOnChange = (e) => {    
    const telefonoCliente = e.target.textContent.split(' ')[0]; //Se obtiene el tel del cliente
    setTelefonoCliente(telefonoCliente);//Se guarda para hacer la venta

    //Obtenemos la cantidad de garrafones previo
    const cliente = listaInventario.filter( item => item.telefono_cliente === telefonoCliente);

    //Colocamos esa cantidad de garrafones para sumarlas a las que compra
    (cliente.length > 0) ? setCantidadBD(cliente[0].cantidad_actual) : setCantidadBD(0);
    
  }

  return (
      <Autocomplete
        disablePortal
        autoHighlight={true}
        id="combo-box-demo"
        options={users ? users : [{label: 'Descargando lista de clientes...'}]}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Cliente" />}
        autoComplete={true}
        size='small'
        onChange={handleOnChange}
      />
  );
   
}