import React, {useEffect} from 'react';
import {useAppState} from "stores/module/app.store";
import {serviceMobileMenuOpenApp} from "services/app.service";
import {NavLink} from "react-router-dom";
import {FaRegArrowAltCircleLeft} from "@react-icons/all-files/fa/FaRegArrowAltCircleLeft";
import HeaderClock from "components/common/header/components/HeaderClock";
import NavbarBlock from "components/common/navbar/components/NavbarBlock";

function NavbarMobile({menus, pathname}) {

    const {theme, mobileMenuOpen, photos} = useAppState();

    const logo = photos[`admin_logo_${theme}`]

    useEffect(() => {
        if (mobileMenuOpen)
            serviceMobileMenuOpenApp(false);
    }, [pathname])


    return (
        <nav
            className={`lg:hidden fixed top-0 ${mobileMenuOpen ? 'left-0' : '-left-full'} right-0 transition-all duration-300 bottom-0 w-full z-[999] dark:bg-gray-900/90 bg-gray-900/60`}>
            <div className="w-[calc(100%_-_70px)] h-full bg-white dark:bg-gray-800 overflow-hidden">
                <div
                    className="flex shrink-0 items-center justify-between py-2 px-4 border-b border-gray-200 dark-border">
                    <div className="flex items-center">
                        <NavLink to={'/'} className="h-[25px] inline-flex shrink-0">
                            <img src={logo} alt={""} className="w-full h-full object-contain"/>
                        </NavLink>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center text-2xl text-mute"
                            onClick={() => serviceMobileMenuOpenApp(false)}>
                        <span>
                            <FaRegArrowAltCircleLeft/>
                        </span>
                    </button>
                </div>
                <div className="shrink-0 overflow-y-auto h-[calc(100%_-_20vh)]">
                    <div className="flex justify-between py-2 border-b border-color p-3">
                        <HeaderClock/>
                    </div>
                    <NavbarBlock menus={menus} pathname={pathname}/>
                </div>
            </div>
        </nav>
    );
}

export default NavbarMobile;