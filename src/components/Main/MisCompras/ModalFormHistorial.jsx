import styles from '../../../css/usuarios/ComprasModal.module.css';
import { Dialog, DialogTitle } from '@mui/material';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Box, Avatar } from '@mui/material';
import { fechaCorta, hora } from '../../../utils/formateadorDeFechas';

export function ModalFormHistorial(props){

    const { onClose, open, dataHistorial, titulo } = props; //Props de la ventana modal
    const tituloModal = titulo === 'compras' ? 'Historial de mis compras' : 'Historial de llenados gratis';

    return dataHistorial ? (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
                <p className={styles.tituloModal}> {tituloModal}</p>
            </DialogTitle>
            <Box className={styles.containerCuerpoModal}>
                <ul className={styles.contenedorTransaccion}>
                    { dataHistorial.error ? <p > Ocurrió un error al obtener sus datos. Inténtelo más tarde. </p> :
                    !dataHistorial.tieneDatos ? <p > No tiene {titulo} previas. </p> //No hay transacciones
                    : //Si hay transacciones
                            dataHistorial.data.map( ({_id, id_venta, cantidad, createdAt, Productos}) => {
                                const fecha = new Date(createdAt);
                                const diaDeLaTransaccion = fechaCorta(fecha);
                                const horaDeLaTransaccion = hora(fecha);
                                return Productos ? ( //Si la transaccion son Ventas
                                    <li className={styles.fechaDeTransaccion} key={_id}>
                                        {`${diaDeLaTransaccion} ${horaDeLaTransaccion}`}
                                        <ul className={styles.transaccion_itemsContenedor}>
                                            {Productos.map( ({id_producto, cantidad, nombre, capacidad, medida}) => {
                                                return (
                                                    <li className={styles.transaccionItem} key={id_producto}>
                                                        {`${cantidad} ${nombre} de ${capacidad} ${medida}`}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                ) : //Si la transaccion son Llenados gratis
                                (
                                    <li className={styles.fechaDeTransaccion} key={id_venta}>
                                        {`${diaDeLaTransaccion} ${horaDeLaTransaccion}`}
                                        <p className={styles.transaccion_itemsContenedor}>
                                            {`${cantidad} Garrafon de 19 litros`}
                                        </p>
                                    </li>
                                );
                            })
                    }                
                </ul>
            </Box>
            <List 
                className={styles.contenedorBotones}
            >                    
                {props.botones.map((boton, key) => (
                <ListItem 
                    button 
                    onClick={onClose} 
                    key={key}
                    className={styles.botones}
                >
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: boton.color[100], color: boton.color[600] }}>
                            {boton.icon}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={boton.nombre} />
                </ListItem>
                ))}
            </List>
        </Dialog>
    ) : null;
}