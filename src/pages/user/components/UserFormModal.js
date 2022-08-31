import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {useUserStore} from "store/module/user.store";
import {serviceUserSave, serviceUserSetModal} from "services/user.service";
import {Col, Row} from "antd";
import {FormInput, FormSelect} from "components/ui/form";
import {serviceAppSetError} from "services/app.service";
import {usePermissionStore} from "store/module/permission.store";
import {servicePermissionSelectList} from "services/permission.service";

function UserFormModal(props) {

    const {visibleFormModal, tableRow, translateKey} = useUserStore();
    const [loading, setLoading] = useState(false)

    const {permissions} = usePermissionStore();
    const [form, setForm] = useState({});

    const handleForm = (item = {}) => {
        const customForm = {
            id: item.id || '',
            email: item.email || '',
            password: item.password || '',
            name: item.name || '',
            surname: item.surname || '',
            permission_id: item.permission_id || 1,
        };
        setForm({...customForm});
    }

    const handleClose = () => {
        serviceAppSetError({});
        serviceUserSetModal('form', false);
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

    useEffect(() => {
        if (visibleFormModal) {
            servicePermissionSelectList();
        }
    }, [visibleFormModal])

    return (
        <Modal
            title={translate('crm.Sidebar.Users')}
            visible={visibleFormModal}
            onClose={() => handleClose()}
            className="lg:!w-96"
        >
            {visibleFormModal && (
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Email')}
                                error={"email"}
                            >
                                <FormInput
                                    value={form?.email}
                                    onChange={e => setForm(f => ({
                                        ...f,
                                        email: e.target.value
                                    }))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Password')}
                                error={!form.id ? "password" : false}
                            >
                                <FormInput
                                    value={form?.password}
                                    onChange={e => setForm(f => ({
                                        ...f,
                                        password: e.target.value
                                    }))}
                                />
                            </FormGroup>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Name')}
                                error={"name"}
                            >
                                <FormInput
                                    value={form?.name}
                                    onChange={e => setForm(f => ({
                                        ...f,
                                        name: e.target.value
                                    }))}
                                />
                            </FormGroup>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Surname')}
                                error={"surname"}
                            >
                                <FormInput
                                    value={form?.surname}
                                    onChange={e => setForm(f => ({
                                        ...f,
                                        surname: e.target.value
                                    }))}
                                />
                            </FormGroup>
                        </Col>

                        <Col lg={24} xs={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Permission')}
                                error={"permission_id"}
                            >
                                <FormSelect
                                    allowClear={false}
                                    options={permissions.filter(i => i.id)}
                                    value={form?.permission_id}
                                    onChange={e => setForm(f => ({
                                        ...f,
                                        permission_id: e
                                    }))}
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

export default UserFormModal;
