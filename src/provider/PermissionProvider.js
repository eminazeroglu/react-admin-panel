import React from 'react';
import {can, flatten, route} from "utils/helpers";
import {Navigate, useLocation, matchPath} from "react-router-dom";
import routers from "router/routers";

function PermissionProvider({children}) {
    const {pathname} = useLocation();
    const routerArr = flatten(routers);
    const item = routerArr.find(i => {
        if (i?.path) {
            const match = matchPath(i.path, pathname);
            return (i.path === pathname || i.path === pathname.slice(1)) || match
        }
        return false
    });

    if (item && item?.path !== '*' && (item.permission === 'accept' || can(item.permission))) {
        return children;
    }

    return <Navigate to={route('app.index')} replace={true}/>
}

export default PermissionProvider;
