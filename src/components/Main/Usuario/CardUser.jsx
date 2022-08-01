import { Avatar, Typography , Card, CardHeader, CardContent, Box } from '@mui/material';
import { stringAvatar } from '../../../utils/stringAvatar';
import { theme }  from '../../../utils/theme';
import { ThemeProvider } from '@mui/material/styles';
// import { NavLink} from 'react-router-dom';
// import { DASHBOARD, DASHDATOS, DASHDIRECCION, DASHMISCELANEOS } from '../../../config/router/paths.js';

export function CardUser({usuarios}) {
    
    return (
        usuarios.map((usuario, key)=> {
            return <ThemeProvider theme={theme} key={key}>
                <Card 
                    sx={{ width: {xs: '100%', sm: '275px', lg: '320px'}}}  //width: {xs: '100%', sm: '300px'}, minWidth: 275
                >
                    <CardHeader
                        avatar={
                            <Avatar 
                                {...stringAvatar(
                                    {nombre: `${usuario.nombre} ${usuario.apellidos}`,
                                        sx: {
                                            width: {xs: '56px', sm: '66px', lg:'76px'},
                                            height: {xs: '56px', sm: '66px', lg:'76px'},
                                            fontSize: {xs: '1.4rem', sm: '1.8rem', lg:'2.1rem'},
                                        }
                                    }
                                )} 
                                
                            />
                        }
                        title={
                            <Typography
                                sx={{                                    
                                    fontSize: {xs: '1.2rem', sm: '1.4rem', lg:'1.5rem'},
                                }}
                            >
                                {usuario.nombre} {usuario.apellidos}
                            </Typography >
                        }
                        subheader={
                            <Typography 
                                sx={{                                    
                                    fontSize: {xs: '.9rem', sm: '1rem', lg:'1.2rem'},
                                }}
                                color="text.secondary"
                            >
                                {usuario.tipo}
                            </Typography >
                        }
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" color="text.secondary">
                            {usuario.telefono}
                        </Typography>
                        <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
                            {usuario.email ? usuario.email : 'Sin correo electrónico'}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{color: 'var(--second-a-text-color)', fontWeight: '600'}}>
                            Compras actuales:
                        </Typography>
                    </CardContent>                 
                    <Box>
                        {/* <NavLink to={`/usuario/${usuario.id}/` + DASHBOARD + '/' + DASHDATOS}>Datos</NavLink>
                        <NavLink to={`/usuario/${usuario.id}/` + DASHBOARD + '/' + DASHDIRECCION}>Dirección</NavLink>
                        <NavLink to={`/usuario/${usuario.id}/` + DASHBOARD + '/' + DASHMISCELANEOS}>Misceláneo</NavLink> */}
                    </Box>
                </Card>
            </ThemeProvider>
        })
      );
}