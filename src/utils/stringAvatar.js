import { stringToColor } from './stringToColor'

export function stringAvatar({nombre, sx}) {
    return {
      sx: {
        ...sx,
        bgcolor: stringToColor(nombre),
      },
      children: `${nombre.split(' ')[0][0]}${nombre.split(' ')[1][0]}`,
    };
  }

  //https://mui.com/material-ui/react-avatar/