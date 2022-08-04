import React, {useEffect, useRef} from 'react';
import {NavLink} from "react-router-dom";
import {route, translate} from "utils/helpers";
import {MdKeyboardArrowDown} from "@react-icons/all-files/md/MdKeyboardArrowDown";
import {useAppState} from "stores/module/app.store";
import {serviceMobileMenuOpenApp} from "services/app.service";
import {isMobile} from "react-device-detect";

function NavbarBlock({menus, pathname}) {

    const {mobileMenuOpen} = useAppState();
    const menuRef = useRef();

    const desktopClass = 'absolute top-full -left-3 opacity-0 z-[99] invisible bg-white shadow min-w-full transition-all group-hover:left-0 group-hover:opacity-100 group-hover:visible dark-bg-secondary dark:border dark-border';
    const mobileClass = 'sub-menu h-0 overflow-hidden dark-bg-secondary dark-border pl-3';

    const handleMenu = (e) => {
        const obj = e.target.closest('button') ? e.target.closest('button') : e.target;
        const parent = obj.closest('li.group');
        const menus = document.querySelectorAll('.sub-menu')
        const menu = parent.querySelector('.sub-menu');

        menus.forEach(i => {
            i.classList.add('h-0');
            i.classList.remove('h-auto');
        })

        menu.classList.add('h-auto')
        menu.classList.remove('h-0')
    }

    useEffect(() => {
        if (mobileMenuOpen)
            serviceMobileMenuOpenApp(false);
    }, [pathname])

    return (
        <ul className={`container mx-auto lg:flex items-center justify-between p-1 py-3 lg:p-0`}>
            {menus.length > 0 && menus.map((menu, menuIndex) => {
                const subMenus = menu?.children?.length > 0 ? menu.children.filter(i => i.access) : [];
                return (
                    <li key={menuIndex} className="relative group">
                        {!subMenus.length && (
                            <NavLink to={route(menu.route)} className={`h-10 flex items-center whitespace-nowrap px-3 text-white hover:text-secondary ${pathname === route(menu.route) ? 'text-secondary' : ''}`}>
                                <div className="space-x-2 flex items-center">
                                    <span>{menu.icon}</span>
                                    <span>{translate(menu.title)}</span>
                                </div>
                            </NavLink>
                        )}
                        {subMenus.length > 0 && (
                            <>
                                <button
                                    onClick={(e) => isMobile ? handleMenu(e) : false}
                                    className="h-10 flex items-center whitespace-nowrap space-x-3 px-3 text-white hover:text-secondary">
                                    <div className="space-x-2 flex items-center">
                                        <span>{menu.icon}</span>
                                        <span>{translate(menu.title)}</span>
                                    </div>
                                    <span>
                                            <MdKeyboardArrowDown/>
                                        </span>
                                </button>
                                <ul
                                    ref={menuRef}
                                    className={isMobile ? mobileClass : desktopClass}>
                                    {subMenus.map((subMenu, subMenuIndex) => (
                                        <li key={subMenuIndex + '_' + menuIndex}>
                                            <NavLink to={route(subMenu.route)} className="h-10 flex items-center px-5 font-semibold text-mute hover:text-secondary whitespace-nowrap hover:bg-gray-100 hover:!text-black dark:hover:bg-gray-700 dark:hover:!text-secondary">
                                                <div className="space-x-2 flex items-center">
                                                    {subMenu.icon && <span>{subMenu.icon}</span>}
                                                    <span>{translate(subMenu.title)}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </li>
                )
            })}
        </ul>
    );
}

export default NavbarBlock;