import React from "react";
import {NavLink} from "react-router-dom";
import {route} from "utils/helpers";
import {FiSettings} from "@react-icons/all-files/fi/FiSettings";

export default function HeaderSetting(props) {
    return (
        <NavLink to={route('app.setting')} className="header-action-icon">
            <FiSettings/>
        </NavLink>
    );
}
