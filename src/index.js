import 'assets/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "store";
import 'utils/property'
import App from './App';
import {serviceAppCheckTheme} from "services/app.service";

serviceAppCheckTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
