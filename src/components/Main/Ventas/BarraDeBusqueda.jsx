import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getUsuarios } from '../../../data/peticionesMongo/getUsuarios';

export function BarraDeBusqueda({token, setTelefonoCliente}){

  const [users, setUsers] = useState(null) //Todos los usuarios a mostrar en el buscador

  useEffect( ()=>{ //Colocamos los usuarios en el buscador
    
    if(!users || users.length < 2){

      async function fetchData() {
        const data = await getUsuarios(token);

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

  const handleOnChange = (e) => {
    
    const telefonoCliente = e.target.textContent.split(' ')[0];
    setTelefonoCliente(telefonoCliente);
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