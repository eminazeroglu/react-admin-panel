import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import {Button, Card, FormGroup} from "components/ui";
import {translate} from "utils/helpers";
import {FormInput} from "components/ui/form";
import {serviceSettingItem, serviceSettingSave} from "services/setting.service";
import {serviceLanguageSelectList} from "services/language.service";
import {useSettingStore} from "store/module/setting.store";

function SettingWorkTime() {
    const tab = 'work-time'
    const {translateKey} = useSettingStore();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    const handleForm = (item = {}) => {
        const customForm = {
            sunday: item.sunday || '',
            weekdays: item.weekdays || '',
            weekend: item.weekend || '',
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
        <Card className={'lg:w-[500px]'} title={translate('crm.Sidebar.WorkTime')}>
            <form onSubmit={handleSubmit}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Weekdays')}
                        >
                            <FormInput
                                value={form?.weekdays}
                                onChange={e => setForm(f => ({...f, weekdays: e.target.value}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Weekend')}
                        >
                            <FormInput
                                value={form?.weekend}
                                onChange={e => setForm(f => ({...f, weekend: e.target.value}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Sunday')}
                        >
                            <FormInput
                                value={form?.sunday}
                                onChange={e => setForm(f => ({...f, sunday: e.target.value}))}
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

export default SettingWorkTime;
