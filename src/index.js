import React from 'react';
import  ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { createTheme, ThemeProvider} from '@mui/material/styles';
const theme = createTheme({});
//Pulling the code from github on a laptop for testing.
ReactDOM.render(
<ThemeProvider theme = {theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
</ThemeProvider>,
document.getElementById('root'),
);