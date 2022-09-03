import React, {useEffect, useState} from 'react';
import {serviceSettingItem, serviceSettingSave} from "services/setting.service";
import {Checkbox, Col, Row} from "antd";
import {Button, Card, FormGroup} from "components/ui";
import {FormInput, FormSelect, FormTextarea} from "components/ui/form";
import {useSettingStore} from "store/module/setting.store";
import {getIframeSrc, translate} from "utils/helpers";
import {serviceLanguageSelectList} from "services/language.service";
import {useLanguageStore} from "store/module/language.store";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {FiMinus} from "@react-icons/all-files/fi/FiMinus";
import {FaWhatsapp} from "@react-icons/all-files/fa/FaWhatsapp";

function SettingMain() {
    const tab = 'general'
    const {translateKey} = useSettingStore();
    const {languages} = useLanguageStore();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    const handleForm = (item = {}) => {
        const customForm = {
            language: item.language || '',
            map: item.map || '',
            theme_color: item.theme_color || '',
            emails: item.emails || [''],
            phones: item.phones || [
                {number: null, whatsapp: false}
            ],
        };
        setForm({...customForm});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await serviceSettingSave(form, tab);
        setLoading(false);
    }

    const handleAction = (key, action, index = null) => {
        if (action === 'add') {
            setForm(prevState => {
                let value = [...prevState[key], ''];
                if (key === 'phones') value = [...prevState[key], {number: null, whatsapp: false}]
                return {
                    ...prevState,
                    [key]: value
                }
            })
        } else {
            const items = [...form[key]];
            items.splice(index, 1)
            form[key] = items;
            setForm(prevState => ({
                ...prevState,
                [key]: [...form[key]]
            }))
        }
    }

    const handleChangeArr = (value, index, key) => {
        const items = [...form[key]];
        items[index] = value;
        form[key] = items;
        setForm(prevState => ({
            ...prevState,
            [key]: [...form[key]]
        }))
    }

    const handleChangeObj = (value, index, key, field) => {
        const items = [...form[key]];
        const item = {...items[index]}
        item[field] = value;
        items[index] = item;
        form[key] = items;
        setForm(prevState => ({
            ...prevState,
            [key]: [...form[key]]
        }))
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
        <Card className={'lg:w-[500px]'} title={translate('crm.Sidebar.Main')}>
            <form onSubmit={handleSubmit}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.SystemLanguage')}
                        >
                            <FormSelect
                                options={languages}
                                maxLength={60}
                                value={form?.language}
                                fieldNames={{label: 'name', value: 'code'}}
                                onChange={e => setForm(f => ({...f, language: e}))}
                            />
                        </FormGroup>
                    </Col>

                    <Col span={24} className="space-y-1">
                        {form?.emails?.length > 0 && form.emails.map((i, index) => (
                            <FormGroup
                                key={index}
                                label={index === 0 ? translate(translateKey + '.Label.Email') : ''}
                                suffixClass={'!p-0'}
                                suffix={
                                    <>
                                        {index > 0 && (
                                            <button type={'button'} className="w-[32px] !h-[32px] btn btn--red !p-0 justify-center" property="red" onClick={() => handleAction('emails', 'remove', index)}>
                                                <FiMinus/>
                                            </button>
                                        )}
                                        {index === 0 && (
                                            <button type={'button'} className="w-[32px] !h-[32px] btn btn--primary !p-0 justify-center" onClick={() => handleAction('emails', 'add')}>
                                                <FiPlus/>
                                            </button>
                                        )}
                                    </>
                                }
                            >
                                <FormInput
                                    value={i}
                                    onChange={e => handleChangeArr(e.target.value, index, 'emails')}
                                />
                            </FormGroup>
                        ))}
                    </Col>

                    <Col span={24} className="space-y-1">
                        {form?.phones?.length > 0 && form.phones.map((i, index) => (
                            <FormGroup
                                key={index}
                                label={index === 0 ? translate(translateKey + '.Label.Phone') : ''}
                                prefix={
                                    <Checkbox
                                        checked={i.whatsapp}
                                        value={true}
                                        onChange={e => handleChangeObj(e.target.checked, index, 'phones', 'whatsapp')}
                                    >
                                        <FaWhatsapp/>
                                    </Checkbox>
                                }
                                suffixClass={'!p-0'}
                                suffix={
                                    <>
                                        {index > 0 && (
                                            <button type={'button'} className="w-[32px] !h-[32px] btn btn--red !p-0 justify-center" property="red" onClick={() => handleAction('phones', 'remove', index)}>
                                                <FiMinus/>
                                            </button>
                                        )}
                                        {index === 0 && (
                                            <button type={'button'} className="w-[32px] !h-[32px] btn btn--primary !p-0 justify-center" onClick={() => handleAction('phones', 'add')}>
                                                <FiPlus/>
                                            </button>
                                        )}
                                    </>
                                }
                            >
                                <FormInput
                                    value={i.number}
                                    onChange={e => handleChangeObj(e.target.value, index, 'phones', 'number')}
                                />
                            </FormGroup>
                        ))}
                    </Col>

                    <Col span={24}>
                        <FormGroup
                            label={translate(translateKey + '.Label.Map')}
                            elementClass={'!h-auto'}
                        >
                            <FormTextarea
                                rows={7}
                                value={form?.map}
                                onChange={e => setForm(f => ({...f, map: getIframeSrc(e.target.value)}))}
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

export default SettingMain;
