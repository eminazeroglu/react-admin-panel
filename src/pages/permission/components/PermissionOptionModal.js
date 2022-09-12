import React, {useEffect, useState} from 'react';
import {Card, Loading, Modal} from "components/ui";
import {translate} from "utils/helpers";
import {usePermissionStore} from "store/module/permission.store";
import {
    servicePermissionOption,
    servicePermissionOptionSave,
    servicePermissionSetModal
} from "services/permission.service";
import {Checkbox} from "antd";
import {serviceAppSetError} from "services/app.service";

function PermissionOptionModal(props) {


    const {tableRow, visibleOptionModal} = usePermissionStore();
    const [title, setTitle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [datasource, setDatasource] = useState([]);

    const fetchList = async () => {
        setLoading(true);
        const res = await servicePermissionOption(tableRow.id);
        const items = res.map(i => ({
            ...i,
            fullAccess: i.create && i.read && i.update && i.delete && i.action,
            notAccess: !i.create && !i.read && !i.update && !i.delete && !i.action,
        }))
        setDatasource(items);
        setLoading(false);
    }

    const fetchOptionSave  = (id) => {
        const permission = datasource.find(i => i.id === id);
        const post = {
            permission_id: permission.id,
            group_id: tableRow.id,
            option: {
                create: permission.create,
                read: permission.read,
                update: permission.update,
                delete: permission.delete,
                action: permission.action,
            }
        }
        servicePermissionOptionSave(post);
    }

    const handleNotAccessChange = (value, id) => {
        const index = datasource.findIndex(i => i.id === id);
        if (index >= 0) {
            if (value) {
                datasource[index].create = false;
                datasource[index].read = false;
                datasource[index].update = false;
                datasource[index].delete = false;
                datasource[index].action = false;
                datasource[index].fullAccess = false;
                datasource[index].notAccess = true;
            }
            else datasource[index].notAccess = false;
            setDatasource([...datasource]);
            fetchOptionSave(id);
        }
    }

    const handleFullAccessChange = (value, id) => {
        const index = datasource.findIndex(i => i.id === id);
        if (index >= 0) {
            if (value) {
                datasource[index].create = true;
                datasource[index].read = true;
                datasource[index].update = true;
                datasource[index].delete = true;
                datasource[index].action = true;
                datasource[index].fullAccess = true;
                datasource[index].notAccess = false;
            }
            else datasource[index].fullAccess = false;
            setDatasource([...datasource]);
            fetchOptionSave(id);
        }
    }

    const handleStatus = (value, index, key) => {
        datasource[index][key] = value;
        setDatasource([...datasource]);
        fetchOptionSave(datasource[index].id);
    }

    const handleClose = () => {
        serviceAppSetError({});
        servicePermissionSetModal('option', false);
    }

    useEffect(() => {
        if (tableRow?.id && visibleOptionModal) {
            setTitle(translate('crm.Sidebar.Permissions') + (tableRow?.name ? ' / ' + tableRow?.name : ''))
            fetchList();
        }
    }, [tableRow, visibleOptionModal])


    return (
        <Modal
            title={title}
            visible={visibleOptionModal}
            onClose={() => handleClose()}
            className="lg:!w-[900px] !w-full"
        >
            <Loading loading={loading}>
                <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '200px'}}>Adı</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Tam səlahiyyət</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Tam məhdudiyyət</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Baxış</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Yarat</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Düzəliş et</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Sil</th>
                        <th style={{width: '100px', textAlign: 'center'}}>Digrə</th>
                    </tr>
                    </thead>
                    <tbody>
                    {datasource.map((i, index) => (
                        <tr key={index}>
                            <td>{translate(i.name)}</td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.fullAccess}
                                    onChange={e => handleFullAccessChange(e.target.checked, i.id)}
                                    disabled={i.notAccess}
                                />
                            </td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.notAccess}
                                    onChange={e => handleNotAccessChange(e.target.checked, i.id)}
                                    disabled={i.fullAccess}
                                />
                            </td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.read}
                                    onChange={e => handleStatus(e.target.checked, index, 'read')}
                                    disabled={i.notAccess}
                                />
                            </td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.create}
                                    onChange={e => handleStatus(e.target.checked, index, 'create')}
                                    disabled={i.notAccess}
                                />
                            </td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.update}
                                    onChange={e => handleStatus(e.target.checked, index, 'update')}
                                    disabled={i.notAccess}
                                />
                            </td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.delete}
                                    onChange={e => handleStatus(e.target.checked, index, 'delete')}
                                    disabled={i.notAccess}
                                />
                            </td>
                            <td className="text-center">
                                <Checkbox
                                    checked={i.action}
                                    onChange={e => handleStatus(e.target.checked, index, 'action')}
                                    disabled={i.notAccess}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Loading>
        </Modal>
    );
}

export default PermissionOptionModal;
