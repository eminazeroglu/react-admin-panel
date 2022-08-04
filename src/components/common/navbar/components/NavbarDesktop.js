import React from 'react';
import menus from "router/menus";
import {NavLink} from "react-router-dom";
import {route, translate} from "utils/helpers";
import {MdKeyboardArrowDown} from "@react-icons/all-files/md/MdKeyboardArrowDown";

function NavbarDesktop({menus, pathname}) {

    return (
        <nav className="hidden lg:flex bg-primary dark-bg-secondary dark:border-b dark-border">
            <ul className="container mx-auto flex items-center justify-between">
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
                                    <button className="h-10 flex items-center whitespace-nowrap space-x-3 px-3 text-white hover:text-secondary">
                                        <div className="space-x-2 flex items-center">
                                            <span>{menu.icon}</span>
                                            <span>{translate(menu.title)}</span>
                                        </div>
                                        <span>
                                            <MdKeyboardArrowDown/>
                                        </span>
                                    </button>
                                    <ul className="absolute top-full -left-3 opacity-0 z-[99] invisible bg-white shadow min-w-full transition-all group-hover:left-0 group-hover:opacity-100 group-hover:visible dark-bg-secondary dark:border dark-border">
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
        </nav>
    );
}

export default NavbarDesktop;