import React from 'react';
import {can, flatten, route} from "utils/helpers";
import {Navigate, useLocation} from "react-router-dom";
import routers from "router/routers";

function PermissionProvider({children}) {

    const {pathname} = useLocation();
    const routerArr = flatten(routers);
    const item = routerArr.find(i => (i.path === pathname || i.path === pathname.slice(1)));

    if (item && (item.permission === 'accept' || can(item.permission))) {
        return children;
    }

    return <Navigate to={route('app.index')} replace={true}/>
}

export default PermissionProvider;
