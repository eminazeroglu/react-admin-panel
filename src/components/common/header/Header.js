import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppState} from "store/module/app.store";
import {route} from "utils/helpers";
import HeaderClock from "components/common/header/components/HeaderClock";
import HeaderSetting from "components/common/header/components/HeaderSetting";
import HeaderUserInfo from "components/common/header/components/HeaderUserInfo";
import HeaderThemeMode from "components/common/header/components/HeaderThemeMode";
import {serviceAppMobileMenuOpen} from "services/app.service";
import {FiMenu} from "@react-icons/all-files/fi/FiMenu";

function Header(props) {

    const {theme, photos} = useAppState();

    const logo = photos[`admin_logo_${theme}`]

    return (
        <>
            <div className="lg:flex hidden items-center bg-white dark-bg-secondary dark:border-b dark-border">
                <div className="page-container flex items-center justify-between ">
                    <div className="flex">
                        <NavLink to={route('app.index')} className="h-[40px] inline-flex">
                            <img src={logo} alt={""} className="w-full h-full object-contain"/>
                        </NavLink>
                    </div>

                    <div className="flex items-center justify-end h-full space-x-3">
                        <HeaderClock/>
                        <HeaderThemeMode/>
                        <HeaderSetting/>
                        <HeaderUserInfo/>
                    </div>
                </div>
            </div>

            <div className="lg:hidden p-2 border-b flex items-center justify-between bg-white dark-bg-secondary dark:border-b dark-border">
                <div className="flex items-center space-x-3 w-10">
                    <button onClick={() => serviceAppMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center text-2xl">
                        <FiMenu/>
                    </button>
                    <div className="flex items-center w-40">
                        <NavLink to={'/'} className="h-[25px] w-40 inline-flex shrink-0">
                            <img src={logo} alt={""} className="h-full object-contain"/>
                        </NavLink>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <HeaderThemeMode/>
                    <HeaderUserInfo/>
                </div>
            </div>
        </>

    );
}

export default Header;
