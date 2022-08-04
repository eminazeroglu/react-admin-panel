import React from 'react';
import NavbarDesktop from "components/common/navbar/components/NavbarDesktop";
import menus from "router/menus";
import {useLocation} from "react-router-dom";
import NavbarMobile from "components/common/navbar/components/NavbarMobile";

function Navbar(props) {
    const {pathname} = useLocation();
    const menuMap = menus => menus.map(menu => {

        if (menu?.children) {
            menu.children = menuMap(menu.children);
        }

        menu.access = true;

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