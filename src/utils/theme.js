import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0, // small phone
        xs: 300, // phone
        sm: 600, // tablets
        md: 900, // small laptop
        lg: 1024, // desktop
        xl: 1536 // large screens
      }
    }
  });

/**   Formas de usarlo en un componente

sx={{
    border: {xs: '1px solid blue', sm: '1px solid red'},
    height: {xs: '90px', sm: '70px'},
    width: {xs: '100%', sm: '70px'},
}}

sx={{
    border: {xs: '1px solid blue', sm: '1px solid red', lg: '1px solid green'},
    height: {xs: '100%', sm: '70px'},
    width: {xs: '100%', sm: '70px'},
    height: {xs: '40px'},
    "& .MuiInputBase-root": { height: {xs: "40px"}}
}}

sx={{
    // specify one value that is applied in all breakpoints
    color: 'white',
    // specify multiple values applied in specific breakpoints
    backgroundColor: {
      xxs: "red",
      xs: "orange",
      sm: "yellow",
      md: "green",
      lg: "blue",
      xl: "purple"
    }
  }} 

  You can also set the breakpoints using an array consists of the values from the smallest to largest breakpoint:
  sx={{
    backgroundColor: [
        "red",
        "orange",
        // unset, screen width inside this breakpoint uses the last non-null value
        null,
        "green",
        "blue",
        "purple"
    ]
  }}
  
  */