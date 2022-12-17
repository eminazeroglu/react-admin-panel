import React, {useEffect} from 'react';
import {flatten, route} from "utils/helpers";
import menus from "router/menus";
import {useLocation} from "react-router-dom";
import {useAppState} from "store/module/app.store";
import {serviceAppCheckTheme, serviceAppFetchStart, serviceAppSetCurrentPage} from "services/app.service";
import {useAuthState} from "store/module/auth.store";
import {serviceAuthFetchCheckToken} from "services/auth.service";
import {Loading} from "components/ui";

function AppProvider({children}) {
    const {token} = useAuthState();
    const pages = flatten(menus);
    const {pathname} = useLocation();
    const {theme} = useAppState();
    const {applicationShow} = useAppState();

    useEffect(() => {
        serviceAppCheckTheme();
    }, [theme])

    useEffect(() => {
        const findPage = pages.find(i => route(i.route) === pathname);
        if (findPage) {
            delete findPage.icon;
            serviceAppSetCurrentPage(findPage)
        }
    }, [pathname])

    useEffect(() => {
        if (token) {
            serviceAuthFetchCheckToken();
        }
    }, [token])

    useEffect(() => {
        serviceAppFetchStart();
    }, [])

    if (applicationShow)
        return children;
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Loading loading={true} fontSize={40} />
        </div>
    )
}

export default AppProvider;
