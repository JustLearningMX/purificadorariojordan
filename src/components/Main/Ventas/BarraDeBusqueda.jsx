import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getUsuarios } from '../../../data/peticionesMongo/getUsuarios';
import { getInventarioClientes } from '../../../data/peticionesMongo/getInventarioClientes';

export function BarraDeBusqueda({
                token, setTelefonoCliente, setCantidadBD, setListaInventario, 
                listaInventario, setUsers, users, setValueCliente, valueCliente}){

  useEffect( ()=>{ //Colocamos los usuarios en el buscador
    
    if(!users || users.length < 2){ //Si no existen usuarios, o solo esta el usuario 000000

      async function fetchData() {

        //Obtenemos la lista de usuarios y la lista del inventario por cliente
        const [dataUser, dataInventario] = await Promise.all(
          [getUsuarios(token), //Usuarios
          getInventarioClientes()] //Inventario de los clientes
        );

        //Guardamos el inventario de los clientes
        !dataInventario.error ? setListaInventario(dataInventario.datos) : setListaInventario([]);

        //Guardamos la lista de usuario para mostrarlo en el buscador
        if(dataUser.error){//Si hubo error con la BD
          setUsers([{label: 'Error al descargar la lista de clientes...'}]); 
        } 
        else if(!dataUser.error && dataUser.usuarios.length > 1){ //Si no hubo error y existe por lo menos un usuario      
          const listaDeUsuarios = dataUser.usuarios
            .filter( usuario => usuario.tipo !== 'admin') //Cualquier usuario ya sea Cliente o Empleado, no Admins
            .map( usuario => {return {label: `${usuario.telefono} - ${usuario.nombre} ${usuario.apellidos}`}} );

          setUsers(listaDeUsuarios);
        }
         
      }
      fetchData();      
    }
  }, [users, token, setListaInventario, setUsers]);

  //Al dar clic en un usuario
  const handleOnChange = (e, v) => {

    //Guardamos el cliente elegido en la barra de busqueda
    setValueCliente(v ? v.label : '');

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
        isOptionEqualToValue={(option, value) => option.label === value.label}
        inputValue={valueCliente}
      />
  );
   
}