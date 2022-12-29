import React from 'react';
import  ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import ToggleDarkAndLightMode from './utilities/DarkAndLightMode';
import store from './app/store';
import './index.css';
ReactDOM.render(
<Provider store = {store}>
    <ToggleDarkAndLightMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </ToggleDarkAndLightMode>,
</Provider>,    
document.getElementById('root'),
);