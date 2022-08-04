import 'assets/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import stores from "stores";
import 'utils/property'
import App from './App';
import {serviceCheckThemeApp} from "services/app.service";

serviceCheckThemeApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={stores}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
