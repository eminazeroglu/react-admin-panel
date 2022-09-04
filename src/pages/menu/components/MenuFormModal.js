import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {useMenuStore} from "store/module/menu.store";
import {serviceMenuSave, serviceMenuSelectList, serviceMenuSetVisibleFormModal} from "services/menu.service";
import {recursiveNotSearch, translate} from "utils/helpers";
import {Col, Row} from "antd";
import {FormInput, FormSelect} from "components/ui/form";
import {serviceAppSetError} from "services/app.service";
import {useLanguageStore} from "store/module/language.store";
import {serviceLanguageSelectList} from "services/language.service";

function MenuFormModal(props) {

    const {languages} = useLanguageStore();
    const {visibleFormModal, tableRow, selectList, translateKey} = useMenuStore();
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({});
    const [parents, setParents] = useState([]);
    const types = [
        {id: '', name: translate('enum.Select')},
        {id: 'header', name: 'Header'},
        {id: 'footer', name: 'Footer'},
    ]

    const handlerForm = (item = {}) => {
        let translates = {};
        languages.filter(i => {
            translates[i.code] = {
                name: item.translates && item.translates[i.code] ? item.translates[i.code].name : ''
            }
        })
        const customForm = {
            id: item.id || '',
            parent_id: item.parent_id || 0,
            link: item.link || '',
            type: item.type || '',
            translates,
        };
        setForm({...customForm});
    }

    const handlerClose = () => {
        serviceAppSetError({});
        serviceMenuSetVisibleFormModal(false);
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await serviceMenuSave(form)
        setLoading(false)
        handlerClose();
    }

    const fetchParents = () => {
        let parents = selectList;
        if (tableRow?.id) parents = recursiveNotSearch('id', tableRow.id, selectList);
        setParents([...parents]);
    }

    useEffect(() => {
        handlerForm(tableRow);
    }, [tableRow])

    useEffect(() => {
        if (selectList.length > 0) {
            fetchParents();
        }
    }, [selectList])

    useEffect(() => {
        if (visibleFormModal) {
            serviceMenuSelectList();
            serviceLanguageSelectList(false)
        }
    }, [visibleFormModal])

    return (
        <Modal
            title={translate('crm.Sidebar.Menus')}
            visible={visibleFormModal}
            onClose={() => serviceMenuSetVisibleFormModal(false)}
            className="w-full lg:!w-96"
        >
            {visibleFormModal && (
                <form onSubmit={handlerSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Parent')}
                            >
                                <FormSelect
                                    options={parents}
                                    value={form.parent_id}
                                    onChange={e => setForm(f => ({...f, parent_id: e}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Type')}
                                error={'type'}
                            >
                                <FormSelect
                                    options={types}
                                    value={form.type}
                                    onChange={e => setForm(f => ({...f, type: e}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Link')}
                                error={'link'}
                            >
                                <FormInput
                                    value={form.link}
                                    onChange={e => setForm(f => ({...f, link: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>

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

export default MenuFormModal;
