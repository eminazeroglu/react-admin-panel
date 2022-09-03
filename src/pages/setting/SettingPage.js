import React from 'react';
import {Page} from "components/ui";
import {Tabs} from "antd";
import {translate} from "utils/helpers";
import SettingMain from "pages/setting/components/SettingMain";
import SettingWorkTime from "pages/setting/components/SettingWorkTime";
import SettingLogo from "pages/setting/components/SettingLogo";
import SettingHtml from "pages/setting/components/SettingHtml";
import SettingSocialPage from "pages/setting/components/SettingSocialPage";
import {isMobile} from "react-device-detect";

const { TabPane } = Tabs;

function SettingPage(props) {
    return (
        <Page>
            <div className="lg:flex justify-between">
                <Tabs
                    className="custom-tab"
                    tabPosition={`${!isMobile ? 'left' : ''}`}
                >
                    <TabPane tab={translate('crm.Sidebar.Main')} key={'general'}>
                        <SettingMain/>
                    </TabPane>
                    <TabPane tab={translate('crm.Sidebar.WorkTime')} key={'work-time'}>
                        <SettingWorkTime/>
                    </TabPane>
                    <TabPane tab={translate('crm.Sidebar.Logo')} key={'logo'}>
                        <SettingLogo/>
                    </TabPane>
                    <TabPane tab={translate('crm.Sidebar.Html')} key={'html'}>
                        <SettingHtml/>
                    </TabPane>
                    <TabPane tab={translate('crm.Sidebar.SocialPage')} key={'social-page'}>
                        <SettingSocialPage/>
                    </TabPane>
                </Tabs>
            </div>
        </Page>
    );
}

export default SettingPage;
