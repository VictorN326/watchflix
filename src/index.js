import React from 'react';
import  ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
//Pulling the code from github on a laptop for testing.
ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>,
    document.getElementById('root'),
);