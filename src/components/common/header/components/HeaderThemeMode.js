import React from 'react';
import {useAppState} from "store/module/app.store";
import {serviceAppThemeChange} from "services/app.service";
import {FiMoon} from "@react-icons/all-files/fi/FiMoon";
import {FiSun} from "@react-icons/all-files/fi/FiSun";


function HeaderThemeMode(props) {

    const {theme} = useAppState();

    return (
        <button onClick={e => serviceAppThemeChange()} className="header-action-icon">
            {theme === 'light' && <FiMoon/>}
            {theme === 'dark' && <FiSun/>}
        </button>
    );
}

export default HeaderThemeMode;