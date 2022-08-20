import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {use$CLASS_NAME$Store} from "store/module/$FILE_NAME$.store";
import {service$CLASS_NAME$Save, service$CLASS_NAME$SetVisibleFormModal} from "services/$FILE_NAME$.service";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {useAppState} from "store/module/app.store";
import {serviceAppSetError} from "services/app.service";

function $CLASS_NAME$FormModal(props) {

    const {languages} = useAppState();
    const {visibleFormModal, tableRow, translateKey} = use$CLASS_NAME$Store();
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({});

    const handleForm = (item = {}) => {
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
        setForm({...customForm});
    }

    const handleClose = () => {
        serviceAppSetError({});
        service$CLASS_NAME$SetVisibleFormModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await service$CLASS_NAME$Save(form);
        if (res) handleClose();
        setLoading(false)
    }

    useEffect(() => {
        handleForm(tableRow);
    }, [tableRow])

    return (
        <Modal
            title={translate('crm.Sidebar.$CLASS_NAME$s')}
            visible={visibleFormModal}
            onClose={() => service$CLASS_NAME$SetVisibleFormModal(false)}
            className="w-full"
        >
            {visibleFormModal && (
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        {languages.length > 0 && languages.map((i, index) => (
                            <Col span={24} key={index}>
                                <FormGroup
                                    label={translate(translateKey + '.Label.Name') + ' (' + i.name + ')'}
                                    error={`translates.${i.code}.name`}
                                >
                                    <FormInput
                                        value={form?.translates[i.code]?.name}
                                        onChange={e => setForm(f => ({...f, translates: {...form.translates, [i.code]: {name: e.target.value}}}))}
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

export default $CLASS_NAME$FormModal;