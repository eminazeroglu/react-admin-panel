import React from 'react';
import {Page} from "components/ui";
import {Tabs} from "antd";
import {can, translate} from "utils/helpers";
import SettingMain from "pages/setting/components/SettingMain";
import SettingWorkTime from "pages/setting/components/SettingWorkTime";
import SettingLogo from "pages/setting/components/SettingLogo";
import SettingHtml from "pages/setting/components/SettingHtml";
import SettingSocialPage from "pages/setting/components/SettingSocialPage";
import {isMobile} from "react-device-detect";
import {useSettingStore} from "store/module/setting.store";

const {TabPane} = Tabs;

function SettingPage(props) {
    const {permission} = useSettingStore();
    return (
        <Page>
            <div className="lg:flex justify-between">
                {(can(permission + '.update') || can(permission + '.create')) && (
                    <>
                        <Tabs
                            className="custom-tab"
                            tabPosition={`${!isMobile ? 'left' : 'top'}`}
                            items={[
                                {
                                    label: translate('crm.Sidebar.Main'),
                                    key: 'general',
                                    children: <SettingMain/>
                                },
                                {
                                    label: translate('crm.Sidebar.WorkTime'),
                                    key: 'work-time',
                                    children: <SettingWorkTime/>
                                },
                                {
                                    label: translate('crm.Sidebar.Logo'),
                                    key: 'logo',
                                    children: <SettingLogo/>
                                },
                                {
                                    label: translate('crm.Sidebar.Html'),
                                    key: 'html',
                                    children: <SettingHtml/>
                                },
                                {
                                    label: translate('crm.Sidebar.SocialPage'),
                                    key: 'social-page',
                                    children: <SettingSocialPage/>
                                },
                            ]}
                        />
                    </>
                )}
            </div>
        </Page>
    );
}

export default SettingPage;
