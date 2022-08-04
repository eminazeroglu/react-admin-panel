import React from 'react';
import NavbarDesktop from "components/common/navbar/components/NavbarDesktop";
import menus from "router/menus";
import {useLocation} from "react-router-dom";

function Navbar(props) {
    const {pathname} = useLocation();
    const menuMap = menus => menus.map(menu => {

        if (menu?.children) {
            menu.children = menuMap(menu.children);
        }

        return menu;
    })

    const customMenus = menuMap(menus)

    return (
        <>
            <NavbarDesktop menus={customMenus} pathname={pathname}/>
        </>
    );
}

export default Navbar;