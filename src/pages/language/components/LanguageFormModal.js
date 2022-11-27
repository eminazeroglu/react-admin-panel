import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {useLanguageStore} from "store/module/language.store";
import {serviceLanguageSave, serviceLanguageSetModal} from "services/language.service";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {serviceAppSetError} from "services/app.service";

function LanguageFormModal(props) {

    const {visibleFormModal, tableRow, translateKey} = useLanguageStore();
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)

    const [form, setForm] = useState({});

    const handleForm = async (item = {}) => {
        const customForm = {
            id: item.id || '',
            name: item?.name || '',
            code: item?.code || '',
        };
        await setForm({...customForm});
        setReady(true);
    }

    const handleClose = () => {
        serviceAppSetError({});
        serviceLanguageSetModal('form', false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await serviceLanguageSave(form);
        if (res) handleClose();
        setLoading(false)
    }

    useEffect(() => {
        handleForm(tableRow);
    }, [tableRow])

    return (
        <Modal
            title={translate('crm.Sidebar.Languages')}
            visible={visibleFormModal}
            onClose={() => handleClose()}
            className="w-full"
        >
            {(ready) && (
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Name')}
                                error={'name'}
                            >
                                <FormInput
                                    value={form.name}
                                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Code')}
                                error={'code'}
                            >
                                <FormInput
                                    value={form.code}
                                    onChange={e => setForm(f => ({...f, code: e.target.value}))}
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
            )}
        </Modal>
    );
}

export default LanguageFormModal;
