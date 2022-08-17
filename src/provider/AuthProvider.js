import React from 'react';
import {useAuthState} from "store/module/auth.store";
import {Navigate} from "react-router-dom";

function AuthProvider({children}) {
    const {token} = useAuthState();

    if (token) return children;

    return <Navigate to={'/auth/login'} replace={true}/>
}

export default AuthProvider;