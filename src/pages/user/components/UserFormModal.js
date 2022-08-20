import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {useUserStore} from "store/module/user.store";
import {serviceUserSave, serviceUserSetVisibleFormModal} from "services/user.service";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {useAppState} from "store/module/app.store";
import {serviceAppSetError} from "services/app.service";

function UserFormModal(props) {

    const {languages} = useAppState();
    const {visibleFormModal, tableRow, translateKey} = useUserStore();
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
        serviceUserSetVisibleFormModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await serviceUserSave(form);
        if (res) handleClose();
        setLoading(false)
    }

    useEffect(() => {
        handleForm(tableRow);
    }, [tableRow])

    return (
        <Modal
            title={translate('crm.Sidebar.Users')}
            visible={visibleFormModal}
            onClose={() => serviceUserSetVisibleFormModal(false)}
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

export default UserFormModal;