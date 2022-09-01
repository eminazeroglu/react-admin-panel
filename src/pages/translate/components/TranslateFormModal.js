import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {useTranslateStore} from "store/module/translate.store";
import {serviceTranslateSave, serviceTranslateSetModal} from "services/translate.service";
import {Col, Row} from "antd";
import {FormTextarea} from "components/ui/form";
import {useAppState} from "store/module/app.store";
import {serviceAppSetError} from "services/app.service";
import {serviceLanguageSelectList} from "services/language.service";

function TranslateFormModal(props) {

    const {languages} = useAppState();
    const {visibleFormModal, tableRow} = useTranslateStore();
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)

    const [form, setForm] = useState({});

    const handleForm = async (item = {}) => {
        const customForm = {};
        await languages.filter(i => {
            customForm[i.code] = {
                key: item[i.code],
                text: translate(item[i.code], {lang: i.code})
            }
        })
        await setForm({...customForm});
        setReady(true);
    }

    const handleField = (value, key) => {
        setForm(prevState => {
            return {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    text: value
                }
            }
        });
    }

    const handleClose = () => {
        serviceAppSetError({});
        serviceTranslateSetModal('form', false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await serviceTranslateSave(form);
        if (res) handleClose();
        setLoading(false)
    }

    const fetchLanguage = async () => {
        await serviceLanguageSelectList()
        await handleForm(tableRow);
    }

    useEffect(() => {
        fetchLanguage();
    }, [tableRow])

    return (
        <Modal
            title={translate('crm.Sidebar.Translates')}
            visible={visibleFormModal}
            onClose={() => handleClose()}
            className="w-full"
        >
            {ready && (
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        {languages.length > 0 && languages.map((i, index) => (
                            <Col span={24} key={index}>
                                <FormGroup
                                    label={i.name}
                                    error={`${i.code}.text`}
                                    elementClass={'!h-auto'}
                                >
                                    <FormTextarea
                                        rows={5}
                                        value={form[i.code]?.text}
                                        onChange={e => handleField(e.target.value, i.code)}
                                    />
                                </FormGroup>
                            </Col>
                        ))}

                        <Col span={24}>
                            <Button loading={loading} type={'submit'}>
                                {translate('button.Save')}
                            </Button>
                        </Col>
                    </Row>
                </form>
            )}
        </Modal>
    );
}

export default TranslateFormModal;
