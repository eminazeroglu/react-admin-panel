import React from 'react';
import AppProvider from "provider/AppProvider";
import {useRoutes} from "react-router-dom";
import routers from "router/routers";


function App() {
    return (
        <AppProvider>
            {useRoutes(routers)}
        </AppProvider>
    );
}

export default App;