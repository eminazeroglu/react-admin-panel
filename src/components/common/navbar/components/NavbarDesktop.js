import React from 'react';
import NavbarBlock from "components/common/navbar/components/NavbarBlock";

function NavbarDesktop({menus, pathname}) {

    return (
        <nav className="hidden lg:flex bg-primary dark-bg-secondary dark:border-b dark-border">
            <NavbarBlock menus={menus} pathname={pathname}/>
        </nav>
    );
}

export default NavbarDesktop;