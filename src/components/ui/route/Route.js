import React from 'react';
import {NavLink} from "react-router-dom";
import {route} from "utils/helpers";

function Route({children, name = '', params = {}}) {
    return (
        <NavLink to={name ? route(name, params) : '/'} replace={true}>
            {children}
        </NavLink>
    );
}

export default Route;