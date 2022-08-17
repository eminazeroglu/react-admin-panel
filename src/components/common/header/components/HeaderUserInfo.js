import React from 'react';
import {translate} from "utils/helpers";
import {Dropdown} from "antd";
import {useAuthState} from "store/module/auth.store";
import {CgProfile} from "@react-icons/all-files/cg/CgProfile";
import {CgLock} from "@react-icons/all-files/cg/CgLock";
import {CgLogOut} from "@react-icons/all-files/cg/CgLogOut";

function HeaderUserInfo(props) {

    const {user} = useAuthState();

    const userMenus = [
        {
            name: translate('crm.Header.Label.Profile'),
            icon: <CgProfile/>,
            action: 'profile'
        },
        {
            name: translate('crm.Header.Label.LockScreen'),
            icon: <CgLock/>,
            action: 'lockScreen'
        },
        {
            name: translate('crm.Header.Label.Logout'),
            icon: <CgLogOut/>,
            action: 'logout'
        }
    ];

    const menus = (
        <div className="dropdown">
            <div className="dropdown-body">
                <ul className="dropdown-items">
                    {userMenus && userMenus.map((menu, index) => (
                        <li key={index}>
                            <button type="button" onClick={() => handleAction(menu.action)} className="dropdown-item space-x-1">
                                <span>{menu.icon}</span>
                                <span>{menu.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

    const handleAction = (action) => {

    }

    return (
        <Dropdown overlay={menus} placement={'bottomRight'}>
            <button
                className="flex items-center space-x-4 h-full bg-[#fafbfd] lg:border-l lg:border-r border-gray-200 lg:p-3 dark:bg-transparent dark-border">
                <div className="icon-user2 text-2xl lg:border border-gray-200 text-gray-400 w-10 h-10 rounded-full inline-flex items-center justify-center dark-border dark-text-primary">
                    <img src={user?.photo} alt=""/>
                </div>
                <div className="lg:flex flex-col text-left hidden">
                    <p className="font-bold text-mute dark-text-primary">{user?.fullname}</p>
                    <span className="text-primary-400 dark-text-secondary">{user?.permission?.name}</span>
                </div>
            </button>
        </Dropdown>
    );
}

export default HeaderUserInfo;