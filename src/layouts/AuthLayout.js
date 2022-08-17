import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Navigate, Outlet} from "react-router-dom";
import {useAuthState} from "store/module/auth.store";
import loginBg from "assets/image/login-bg.jpeg";
import {FormGroup} from "components/ui";
import {FormSelect} from "components/ui/form";
import {useAppState} from "store/module/app.store";
import {serviceAppSetLanguage} from "services/app.service";

function AuthLayout(props) {

    const {token} = useAuthState();
    const {languages, language, photos, theme} = useAppState();

    if (token) return <Navigate to={'/'} replace={true}/>

    const logo = photos[`admin_logo_${theme}`]

    return (
        <div className="auth">
            <PerfectScrollbar>
                <div className="auth-aside">
                    <div className="w-64 mb-10 mx-auto">
                        <img src={logo} className="img-contain" alt=""/>
                    </div>
                    <div className="auth-form">
                        <Outlet/>
                    </div>
                    <div className="mt-20 w-full flex justify-center">
                        <FormGroup className="min-w-[150px] w-auto inline-flex mb-10">
                            <FormSelect
                                value={language}
                                onChange={e => serviceAppSetLanguage(e)}
                                fieldNames={{label: 'name', value: 'code'}}
                                options={languages}
                                allowClear={false}
                            />
                        </FormGroup>
                    </div>
                </div>
            </PerfectScrollbar>
            <div className="auth-main">
                <img src={loginBg} alt="" className="img-cover"/>
            </div>
        </div>
    );
}

export default AuthLayout;