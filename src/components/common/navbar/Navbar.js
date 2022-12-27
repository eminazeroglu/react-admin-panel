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
        const newMenu = Object.assign({}, menu);
        const item = routerArr.find(i => (i.path === route(newMenu.route) || i.path === route(newMenu.route).slice(1)));

        newMenu.access = (item === 'accept' || can(item?.permission)) || false;

        if (newMenu?.children) {
            newMenu.children = menuMap(newMenu.children);
            if (!newMenu.children.find(i => i.access)) newMenu.access = false;
        }

        return newMenu;
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
