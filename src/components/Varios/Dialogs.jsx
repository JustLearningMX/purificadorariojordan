import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

/**Funcion que muestra una ventana de Dialogo Modal */
export function Dialogs(props) {

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{props.titulo}</DialogTitle>
            <List sx={{ pt: 0, display: props.display}}>
                {props.botones.map((boton, key) => (
                <ListItem button onClick={() => handleListItemClick(boton.nombre)} key={key}>
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
    );
}