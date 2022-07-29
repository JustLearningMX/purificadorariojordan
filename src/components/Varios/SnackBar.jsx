import { useState, useEffect, forwardRef } from 'react';
import {Stack, Snackbar, Alert as MuiAlert} from '@mui/material';
import { theme }  from '../../utils/theme';
import { ThemeProvider } from '@mui/material/styles';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars({mensaje, severity, countOpens}) {
    const [open, setOpen] = useState(false);
    
    useEffect(()=>{
        setOpen(true);
    }, [countOpens]);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Stack 
                spacing={2} 
                sx={{
                    width: '100%',
                }}
            >

                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert 
                        onClose={handleClose} 
                        severity={severity} 
                        sx={{
                            width: '100%',
                            fontSize: {xs: '.8rem', sm: '.9rem', lg: '1rem'},
                        }}
                    >
                        {mensaje}
                    </Alert>
                </Snackbar>
            </Stack>
        </ThemeProvider>
    );
}

/* <Alert severity="success">This is an error message!</Alert>
<Alert severity="error">This is a warning message!</Alert>
<Alert severity="warning">This is a warning message!</Alert>
<Alert severity="info">This is an information message!</Alert>
<Alert severity="success">This is a success message!</Alert> */