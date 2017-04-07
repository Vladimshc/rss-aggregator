import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './views/components/login.jsx';
import App from './views/components/app.jsx';
import Register from './views/components/register.jsx';

ReactDOM.render(
    <BrowserRouter>
        <App>
             <Route path="/login" component={Login} />
             <Route path="/register" component={Register} />
        </App>
    </BrowserRouter>,
    
    document.getElementById('app')
);



