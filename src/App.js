import React from 'react';
import AppProvider from "provider/AppProvider";
import {useRoutes} from "react-router-dom";
import routers from "router/routers";
import {useAuthState} from "store/module/auth.store";
import PermissionProvider from "provider/PermissionProvider";


function App() {
    const {token} = useAuthState();

    const RouterComponent = () => useRoutes(routers)

    return (
        <AppProvider>
            {token && <PermissionProvider>{<RouterComponent/>}</PermissionProvider>}
            {!token && <RouterComponent/>}
        </AppProvider>
    );
}

export default App;
