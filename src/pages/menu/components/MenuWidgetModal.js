import React, {useEffect, useState} from 'react';
import {translate} from "utils/helpers";
import {serviceMenuSetVisibleWidgetModal, serviceMenuWidget} from "services/menu.service";
import {useMenuStore} from "store/module/menu.store";
import {Button, Card, FormGroup, Modal} from "components/ui";
import {Col, Row} from "antd";
import {useWidgetStore} from "store/module/widget.store";
import {serviceWidgetSelectList} from "services/widget.service";
import {FormNumber, FormSelect} from "components/ui/form";
import {serviceAppSetError} from "services/app.service";
import {FiTrash} from "@react-icons/all-files/fi/FiTrash";

function MenuWidgetModal(props) {
    const {visibleWidgetModal, tableRow, translateKey} = useMenuStore();
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)
    const {widgets} = useWidgetStore();
    const initialWidget = {
        widget_id: '',
        position: ''
    }

    const [form, setForm] = useState({
        widgets: []
    });

    const handleForm = async (widgets = []) => {
        await setForm({
            widgets
        });
        setReady(true);
    }

    const handleClose = () => {
        serviceAppSetError({});
        serviceMenuSetVisibleWidgetModal(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await serviceMenuWidget(tableRow.id, form);
        if (res) handleClose();
        setLoading(false)
    }

    const handleAction = (key, action, index = null) => {
        if (action === 'add') {
            setForm(prevState => {
                return {
                    ...prevState,
                    [key]: [...prevState[key], initialWidget]
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

    useEffect(() => {
        if (tableRow?.id && visibleWidgetModal) {
            serviceWidgetSelectList();
            const widgets = tableRow.widgets.length > 0 ? tableRow.widgets.map(i => ({
                widget_id: i.pivot.widget_id,
                position: i.pivot.position
            })) : [initialWidget];
            handleForm(widgets)
        }
    }, [tableRow, visibleWidgetModal])

    return (
        <Modal
            title={translate('crm.Sidebar.Menus') + (tableRow.id ? ' / ' + tableRow.name : '')}
            visible={visibleWidgetModal}
            onClose={() => serviceMenuSetVisibleWidgetModal(false)}
            className="w-full"
        >
            <div className="space-y-3">
                <div className="flex justify-end">
                    <button className="btn btn--indigo" type={'button'} onClick={() => handleAction('widgets', 'add')}>
                        {translate('button.Add')}
                    </button>
                </div>
                <div>
                    {ready && (
                        <form onSubmit={handleSubmit}>
                            <Row gutter={[16, 16]}>
                                <Col span={24} className="space-y-3">
                                    {form.widgets.map((i, index) => (
                                        <Card key={index}>
                                            <Row gutter={[16, 16]}>
                                                <Col lg={14} xs={24}>
                                                    <FormGroup
                                                        label={translate(translateKey + '.Label.WidgetName')}
                                                        error={`widgets.${index}.widget_id`}
                                                    >
                                                        <FormSelect
                                                            allowClear={false}
                                                            value={i?.widget_id}
                                                            onChange={e => handleChangeObj(e, index, 'widgets', 'widget_id')}
                                                            options={widgets}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={6} xs={24}>
                                                    <FormGroup
                                                        label={translate(translateKey + '.Label.WidgetPosition')}
                                                    >
                                                        <FormNumber
                                                            min={1}
                                                            value={i?.position}
                                                            onChange={e => handleChangeObj(e, index, 'widgets', 'position')}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={4} xs={24} className="flex justify-end pt-[26px]">
                                                    <button type={'button'} className="btn btn--red" onClick={() => handleAction('widgets', 'remove', index)}>
                                                        <FiTrash/>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))}
                                </Col>

                                <Col span={24}>
                                    <Button loading={loading} type={'submit'}>
                                        {translate('button.Save')}
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default MenuWidgetModal;
