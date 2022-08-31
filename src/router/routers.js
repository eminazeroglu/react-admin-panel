import {Navigate} from "react-router-dom";
import AuthProvider from "provider/AuthProvider";
import AuthLayout from "layouts/AuthLayout";
import AppLayout from "layouts/AppLayout";
import HomePage from "pages/home/HomePage";
import LoginPage from "pages/auth/LoginPage";
import ForgetPasswordPage from "pages/auth/ForgetPasswordPage";
import RegisterPage from "pages/auth/RegisterPage";
import MenuPage from "pages/menu/MenuPage";
import UserPage from "pages/user/UserPage";
import LanguagePage from "pages/language/LanguagePage";
import TranslatePage from "pages/translate/TranslatePage";
import PermissionPage from "pages/permission/PermissionPage";
import SettingPage from "pages/setting/SettingPage";
import PermissionOptionPage from "pages/permission/PermissionOptionPage";

const routers = [
    {
        name: 'app',
        path: '/',
        element: <AppLayout/>,
        auth: true,
        children: [
            {
                name: 'home',
                index: true,
                permission: 'accept',
                element: <HomePage/>,
            },
            {
                name: 'menu',
                path: 'menu',
                permission: 'accept',
                element: <MenuPage/>,
            },
            {
                name: 'user',
                path: 'user',
                permission: 'accept',
                element: <UserPage/>,
            },
            {
                name: 'language',
                path: 'language',
                permission: 'accept',
                element: <LanguagePage/>,
            },
            {
                name: 'translate',
                path: 'translate',
                permission: 'accept',
                element: <TranslatePage/>,
            },
            {
                name: 'permission',
                path: 'permission',
                permission: 'accept',
                element: <PermissionPage/>,
            },
            {
                name: 'permission-option',
                path: 'permission-option/:id',
                permission: 'accept',
                element: <PermissionOptionPage/>,
            },
            {
                name: 'setting',
                path: 'setting',
                permission: 'accept',
                element: <SettingPage/>,
            },
        ]
    },
    {
        name: 'auth',
        path: '/auth',
        permission: 'accept',
        element: <AuthLayout/>,
        children: [
            {
                name: 'login',
                index: true,
                path: 'login',
                permission: 'accept',
                element: <LoginPage/>,
            },
            {
                name: 'register',
                path: 'register',
                permission: 'accept',
                element: <RegisterPage/>,
            },
            {
                name: 'forgetPassword',
                path: 'forget-password',
                permission: 'accept',
                element: <ForgetPasswordPage/>,
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/'} replace={true}/>
    }
]

const routerMap = (routers) => routers.map(router => {
    if (router?.auth) {
        router.element = <AuthProvider>{router.element}</AuthProvider>
    }

    if (router?.children) {
        router.children = routerMap(router.children)
    }

    return router;
})

export default routerMap(routers);
