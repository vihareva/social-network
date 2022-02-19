import React from 'react';
import {createTheme, LinearProgress, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#104f9e'
        }
    }
})
let Preloader = () => {
    return <ThemeProvider theme={theme}>
        <LinearProgress/>
    </ThemeProvider>
}

export default Preloader;