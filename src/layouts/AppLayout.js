import React from 'react';
import {useAuthState} from "store/module/auth.store";
import PermissionLayout from "layouts/PermissionLayout";

function AppLayout({children}) {
    const {permissions} = useAuthState();

    if (permissions.length > 0) return <PermissionLayout>{children}</PermissionLayout>

    return (
        <>
            {children}
        </>
    );
}

export default AppLayout;
