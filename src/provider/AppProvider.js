import React, {useEffect} from 'react';
import {flatten} from "utils/helpers";
import routers from "router/routers";
import {useLocation} from "react-router-dom";
import {useAppState} from "stores/module/app.store";
import {serviceCheckThemeApp, serviceFetchStartApp, serviceSetCurrentPageApp} from "services/app.service";
import {useAuthState} from "stores/module/auth.store";
import {serviceFetchCheckTokenAuth} from "services/auth.service";

function AppProvider({children}) {
    const {token} = useAuthState();
    const pages = flatten(routers);
    const {pathname} = useLocation();
    const {theme} = useAppState();
    const {applicationShow} = useAppState();

    useEffect(() => {
        serviceCheckThemeApp();
    }, [theme])

    useEffect(() => {
        const findPage = pages.find(i => i.path === pathname);
        if (findPage) {
            delete findPage.element;
            delete findPage.children;
            serviceSetCurrentPageApp(findPage)
        }
    }, [pathname])

    useEffect(() => {
        if (token) {
            serviceFetchCheckTokenAuth();
        }
    }, [token])

    useEffect(() => {
        serviceFetchStartApp();
    }, [])

    if (applicationShow)
        return children;
    return false
}

export default AppProvider;