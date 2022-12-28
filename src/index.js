import React from 'react';
import  ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import store from './app/store';
import './index.css';
const theme = createTheme({});
//Pulling the code from github on a laptop for testing.
ReactDOM.render(
<Provider store = {store}>
    <ThemeProvider theme = {theme}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </ThemeProvider>,
</Provider>,    
document.getElementById('root'),
);