import React, {useEffect, useState} from 'react';
import {useSettingStore} from "store/module/setting.store";
import {serviceSettingItem, serviceSettingSave} from "services/setting.service";
import {serviceLanguageSelectList} from "services/language.service";
import {Button, Card, FormGroup} from "components/ui";
import {Col, Row} from "antd";
import {translate} from "utils/helpers";
import {FormTextarea} from "components/ui/form";

function SettingHtml(props) {
    const tab = 'html'
    const {translateKey} = useSettingStore();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    const handleForm = (item = {}) => {
        const customForm = {
            body: item.body || '',
            head: item.head || '',
        };
        setForm({...customForm});
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
        <Card title={translate('crm.Sidebar.Html')}>
            <form onSubmit={handleSubmit}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.HeadTag')}
                            elementClass={'!h-auto'}
                        >
                            <FormTextarea
                                rows={10}
                                value={form?.head}
                                onChange={e => setForm(f => ({...f, head: e.target.value}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.BodyTag')}
                            elementClass={'!h-auto'}
                        >
                            <FormTextarea
                                rows={10}
                                value={form?.body}
                                onChange={e => setForm(f => ({...f, body: e.target.value}))}
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

export default SettingHtml;
