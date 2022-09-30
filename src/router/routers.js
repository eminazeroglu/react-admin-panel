import {Navigate} from "react-router-dom";
import AuthProvider from "provider/AuthProvider";
import AuthLayout from "layouts/AuthLayout";
import PermissionLayout from "layouts/PermissionLayout";
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
import SeoPage from "pages/seo/SeoPage";

const routers = [
    {
        name: 'app',
        path: '/',
        element: <PermissionLayout/>,
        auth: true,
        permission: 'accept',
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
                permission: 'menu.read',
                element: <MenuPage/>,
            },
            {
                name: 'user',
                path: 'user',
                permission: 'user.read',
                element: <UserPage/>,
            },
            {
                name: 'language',
                path: 'language',
                permission: 'language.read',
                element: <LanguagePage/>,
            },
            {
                name: 'translate',
                path: 'translate',
                permission: 'language.read',
                element: <TranslatePage/>,
            },
            {
                name: 'permission',
                path: 'permission',
                permission: 'permission.read',
                element: <PermissionPage/>,
            },
            {
                name: 'seo',
                path: 'seo',
                permission: 'seo_meta_tag.read',
                element: <SeoPage/>,
            },
            {
                name: 'setting',
                path: 'setting',
                permission: 'setting.read',
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
