import 'assets/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "store";
import 'utils/property'
import App from './App';
import {serviceAppCheckTheme} from "services/app.service";
import {ConfigProvider} from "antd";
import azAZ from 'antd/lib/locale/az_AZ';
import 'moment/locale/az'
import moment from "moment";

moment.locale('az')

serviceAppCheckTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ConfigProvider locale={azAZ}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ConfigProvider>
    </Provider>
);
