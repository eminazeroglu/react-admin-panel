import React, {useEffect, useState} from 'react';
import {Button, FormGroup, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {useSeoStore} from "store/module/seo.store";
import {serviceSeoSave, serviceSeoSetModal} from "services/seo.service";
import {Col, Row} from "antd";
import {FormInput, FormTextarea} from "components/ui/form";
import {useAppState} from "store/module/app.store";
import {serviceAppSetError} from "services/app.service";

function SeoFormModal(props) {

    const {visibleFormModal, tableRow, translateKey} = useSeoStore();
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)

    const [form, setForm] = useState({});

    const handleForm = async (item = {}) => {
        const customForm = {
            id: item.id || '',
            url: item.url || '',
            title: item.title || '',
            description: item.description || '',
            keywords: item.keywords || '',
            bots: item.bots || {
                robots: '',
                googlebot: '',
                yahoobot: '',
                alexabot: '',
                msnbot: '',
                dmozbot: '',
            },
        };
        await setForm({...customForm});
        setReady(true);
    }

    const handleClose = () => {
        serviceAppSetError({});
        serviceSeoSetModal('form', false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await serviceSeoSave(form);
        if (res) handleClose();
        setLoading(false)
    }

    useEffect(() => {
        handleForm(tableRow);
    }, [tableRow])

    return (
        <Modal
            title={translate('crm.Sidebar.SeoMetaTag')}
            visible={visibleFormModal}
            onClose={() => handleClose()}
            className="w-full"
        >
            {(ready) && (
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Url')}
                                error="url"
                            >
                                <FormInput
                                    value={form?.url}
                                    onChange={e => setForm(f => ({...f, url: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Title')}
                                error="title"
                            >
                                <FormInput
                                    value={form?.title}
                                    onChange={e => setForm(f => ({...f, title: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Keywords')}
                                error="keywords"
                            >
                                <FormInput
                                    showCount={true}
                                    maxLength={60}
                                    value={form?.keywords}
                                    onChange={e => setForm(f => ({...f, keywords: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Description')}
                                error="description"
                                elementClass={'!h-auto'}
                            >
                                <FormTextarea
                                    rows={5}
                                    maxLength={120}
                                    showCount={true}
                                    value={form?.description}
                                    onChange={e => setForm(f => ({...f, description: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={'Robots'}
                            >
                                <FormInput
                                    maxLength={60}
                                    value={form?.bots?.robots}
                                    onChange={e => setForm(f => ({...f, bots: {...form.bots, robots: e.target.value}}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={'Googlebot'}
                            >
                                <FormInput
                                    maxLength={60}
                                    value={form?.bots?.googlebot}
                                    onChange={e => setForm(f => ({...f, bots: {...form.bots, googlebot: e.target.value}}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={'Yahoobot'}
                            >
                                <FormInput
                                    maxLength={60}
                                    value={form?.bots?.yahoobot}
                                    onChange={e => setForm(f => ({...f, bots: {...form.bots, yahoobot: e.target.value}}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={'Alexabot'}
                            >
                                <FormInput
                                    maxLength={60}
                                    value={form?.bots?.alexabot}
                                    onChange={e => setForm(f => ({...f, bots: {...form.bots, alexabot: e.target.value}}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={'Msnbot'}
                            >
                                <FormInput
                                    maxLength={60}
                                    value={form?.bots?.msnbot}
                                    onChange={e => setForm(f => ({...f, bots: {...form.bots, msnbot: e.target.value}}))}
                                />
                            </FormGroup>
                        </Col>

                        <Col span={24}>
                            <FormGroup
                                label={'Dmozbot'}
                            >
                                <FormInput
                                    maxLength={60}
                                    value={form?.bots?.dmozbot}
                                    onChange={e => setForm(f => ({...f, bots: {...form.bots, dmozbot: e.target.value}}))}
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

export default SeoFormModal;
