import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal, Card} from "components/ui";
import {translate} from "utils/helpers";
import {use$CLASS_NAME$Store} from "store/module/$FILE_NAME$.store";
import {service$CLASS_NAME$Save, service$CLASS_NAME$SetModal} from "services/$FILE_NAME$.service";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {serviceAppSetError} from "services/app.service";
import {serviceLanguageSelectList} from "services/language.service";
import {useAppState} from "store/module/app.store";

function $CLASS_NAME$FormModal(props) {

    const {languages} = useAppState();
    const {visibleFormModal, tableRow, translateKey} = use$CLASS_NAME$Store();
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)

    const [form, setForm] = useState({});

    const handleForm = async (item = {}) => {
        let translates = {};
        languages.filter(i => {
            translates[i.code] = {
                name: item.translates && item.translates[i.code] ? item.translates[i.code].name : ''
            }
        })
        const customForm = {
            id: item.id || '',
            translates,
        };
        await setForm({...customForm});
        setReady(true);
    }

    const handleClose = () => {
        serviceAppSetError({});
        service$CLASS_NAME$SetModal('form', false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await service$CLASS_NAME$Save(form);
        if (res) handleClose();
        setLoading(false)
    }

    useEffect(() => {
        serviceLanguageSelectList(false)
        handleForm(tableRow);
    }, [tableRow])

    return (
        <Modal
            title={translate('crm.Sidebar.$CLASS_NAME$s')}
            visible={visibleFormModal}
            onClose={() => handleClose()}
            className="w-full"
        >
            {ready && (
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>

                        <Col xs={24} lg={24} className="space-y-3">
                            {languages.length > 0 && languages.map((i, index) => (
                                <Card title={i.name} key={index}>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} lg={24}>
                                            <FormGroup
                                                label={translate(translateKey + '.Label.Name') + ' (' + i.name + ')'}
                                                error={`translates.${i.code}.name`}
                                            >
                                                <FormInput
                                                    value={form?.translates[i.code]?.name}
                                                    onChange={e => setForm(f => ({...f,
                                                        translates: {
                                                            ...f.translates,
                                                            [i.code]: {...f.translates[i.code], name: e.target.value}
                                                        }
                                                    }))}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </Col>

                        <Col span={24} className="flex justify-end">
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

export default $CLASS_NAME$FormModal;
