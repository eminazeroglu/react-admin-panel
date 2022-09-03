import React from 'react';
import NavbarDesktop from "components/common/navbar/components/NavbarDesktop";
import menus from "router/menus";
import {useLocation} from "react-router-dom";
import NavbarMobile from "components/common/navbar/components/NavbarMobile";
import routers from "router/routers";
import {can, flatten, route} from "utils/helpers";

function Navbar(props) {
    const {pathname} = useLocation();
    const routerArr = flatten(routers);
    const menuMap = menus => menus.map(menu => {

        if (menu?.children) {
            menu.children = menuMap(menu.children);
        }

        const item = routerArr.find(i => (i.path === route(menu.route) || i.path === route(menu.route).slice(1)));

        menu.access = item === 'accept' || can(item.permission);

        return menu;
    })

    const customMenus = menuMap(menus).filter(i => i.access)

    return (
        <>
            <NavbarDesktop menus={customMenus} pathname={pathname}/>
            <NavbarMobile menus={customMenus} pathname={pathname}/>
        </>
    );
}

export default Navbar;
