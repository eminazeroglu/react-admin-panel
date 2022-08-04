import React from 'react';
import {useAppState} from "stores/module/app.store";
import {serviceThemeChangeApp} from "services/app.service";
import {FiMoon} from "@react-icons/all-files/fi/FiMoon";
import {FiSun} from "@react-icons/all-files/fi/FiSun";


function HeaderThemeMode(props) {

    const {theme} = useAppState();

    return (
        <button onClick={e => serviceThemeChangeApp()} className="header-action-icon">
            {theme === 'light' && <FiMoon/>}
            {theme === 'dark' && <FiSun/>}
        </button>
    );
}

export default HeaderThemeMode;