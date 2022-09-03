import React, {useEffect, useState} from 'react';
import {useSettingStore} from "store/module/setting.store";
import {serviceSettingItem, serviceSettingSave} from "services/setting.service";
import {serviceLanguageSelectList} from "services/language.service";
import {Button, Card, FormGroup} from "components/ui";
import {translate} from "utils/helpers";
import {Col, Row} from "antd";
import {FormInput, FormTextarea} from "components/ui/form";
import {FiMinus} from "@react-icons/all-files/fi/FiMinus";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";

function SettingSocialPage(props) {
    const tab = 'social-page'
    const {translateKey} = useSettingStore();
    const [form, setForm] = useState([]);
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForm = (item = {}) => {
        let customForm = [{url: '', icon: ''}];
        if (item.length > 0) customForm = item;
        setForm([...customForm]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await serviceSettingSave(form, tab);
        setLoading(false);
    }

    const handleAction = (action, index = null) => {
        if (action === 'add') {
            setForm(prevState => {
                return [...prevState, {url: '', icon: ''}]
            })
        } else {
            form.splice(index, 1);
            setForm([...form])
        }
    }

    const handleChangeObj = (value, index, field) => {
        form[index][field] = value;
        setForm([...form])
    }

    const fetchByKey = async () => {
        const res = await serviceSettingItem(tab);
        setLink(res.icon_url)
        handleForm(res?.value)
    }

    useEffect(() => {
        if (tab) {
            serviceLanguageSelectList();
            fetchByKey();
        }
    }, [tab])

    return (
        <Card title={translate('crm.Sidebar.SocialPage')} className="lg:w-[600px]">
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    {form.length > 0 && form.map((i, index) => (
                        <Row gutter={[26, 26]} key={index}>
                            <Col lg={12} xs={24}>
                                <FormGroup
                                    label={index === 0 ? 'Icon' : ''}
                                    labelRight={
                                        <a href={link} className="text-blue-500" target={'_blank'}>(Icons)</a>
                                    }
                                >
                                    <FormInput
                                        onChange={e => handleChangeObj(e.target.value, index, 'icon')}
                                        value={i.icon}
                                    />
                                </FormGroup>
                            </Col>

                            <Col lg={12} xs={24}>
                                <FormGroup
                                    label={index === 0 ? 'Link' : ''}
                                >
                                    <FormInput
                                        value={i.url}
                                        onChange={e => handleChangeObj(e.target.value, index, 'url')}
                                        suffix={
                                            <>
                                                {index > 0 && (
                                                    <Button className="w-[32px] !h-[32px] !p-0 justify-center" property="red" onClick={() => handleAction('remove', index)}>
                                                        <FiMinus/>
                                                    </Button>
                                                )}
                                                {index === 0 && (
                                                    <Button className="w-[32px] !h-[32px] !p-0 justify-center" onClick={() => handleAction('add')}>
                                                        <FiPlus/>
                                                    </Button>
                                                )}
                                            </>
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    ))}
                </div>
                <div className="mt-5">
                    <Button loading={loading} type={'submit'}>
                        {translate('button.Save')}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default SettingSocialPage;
