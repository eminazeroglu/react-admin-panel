import React, {useEffect, useState} from 'react';
import {Button, Card, FormGroup} from "components/ui";
import {Col, Row} from "antd";
import {translate} from "utils/helpers";
import {FormPhoto} from "components/ui/form";
import {useSettingStore} from "store/module/setting.store";
import {serviceSettingItem, serviceSettingSave} from "services/setting.service";
import {serviceLanguageSelectList} from "services/language.service";

function SettingLogo() {
    const tab = 'logo'
    const {translateKey} = useSettingStore();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState({});

    const handleForm = (item = {}) => {
        const customForm = {
            logo: '',
            admin_logo_light: '',
            admin_logo_dark: '',
            favicon: '',
            footer: '',
            mobile: '',
            wallpaper: '',
        };
        setForm({...customForm});
        setPreview({
            admin_logo_light_path: item.admin_logo_light_path,
            admin_logo_dark_path: item.admin_logo_dark_path,
            favicon_path: item.favicon_path,
            footer_path: item.footer_path,
            logo_path: item.logo_path,
            mobile_path: item.mobile_path,
            wallpaper_path: item.wallpaper_path,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await serviceSettingSave(form, tab);
        setLoading(false);
    }

    const fetchByKey = async () => {
        const res = await serviceSettingItem(tab);
        handleForm(res?.value)
    }

    useEffect(() => {
        if (tab) {
            serviceLanguageSelectList();
            fetchByKey();
        }
    }, [tab])

    return (
        <Card className={'lg:w-[800px]'} title={translate('crm.Sidebar.Logo')}>
            <form onSubmit={handleSubmit}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Logo')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.logo}
                                preview={preview.logo_path}
                                onChange={e => setForm(f => ({...f, logo: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={6}>
                        <FormGroup
                            label={translate(translateKey + '.Label.FooterLogo')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.footer}
                                preview={preview.footer_path}
                                onChange={e => setForm(f => ({...f, footer: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={6}>
                        <FormGroup
                            label={translate(translateKey + '.Label.MobileLogo')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.mobile}
                                preview={preview.mobile_path}
                                onChange={e => setForm(f => ({...f, mobile: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={6}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Favicon')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.favicon}
                                preview={preview.favicon_path}
                                onChange={e => setForm(f => ({...f, favicon: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={6}>
                        <FormGroup
                            label={translate(translateKey + '.Label.AdminLogin')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.admin_logo_light}
                                preview={preview.admin_logo_light_path}
                                onChange={e => setForm(f => ({...f, admin_logo_light: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={6}>
                        <FormGroup
                            label={translate(translateKey + '.Label.AdminMain')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.admin_logo_dark}
                                preview={preview.admin_logo_dark_path}
                                onChange={e => setForm(f => ({...f, admin_logo_dark: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={12}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Wallpaper')}
                            elementClass={'!h-auto'}
                        >
                            <FormPhoto
                                value={form?.wallpaper}
                                preview={preview.wallpaper_path}
                                onChange={e => setForm(f => ({...f, wallpaper: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={24}>
                        <Button loading={loading} type={'submit'}>
                            {translate('button.Save')}
                        </Button>
                    </Col>
                </Row>
            </form>
        </Card>
    );
}

export default React.memo(SettingLogo);
