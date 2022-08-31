import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Button, Card, Page} from "components/ui";
import {route, translate} from "utils/helpers";
import {usePermissionStore} from "store/module/permission.store";
import {
    servicePermissionItem,
    servicePermissionOption,
    servicePermissionOptionSave,
    servicePermissionSetModal
} from "services/permission.service";
import {Checkbox} from "antd";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {FiArrowLeft} from "@react-icons/all-files/fi/FiArrowLeft";

function PermissionOptionPage(props) {

    const {id} = useParams();
    const {item} = usePermissionStore();
    const [title, setTitle] = useState(false);
    const [datasource, setDatasource] = useState([]);

    const fetchList = async () => {
        const res = await servicePermissionOption(item.id);
        const items = res.map(i => ({
            ...i,
            fullAccess: i.create && i.read && i.update && i.delete && i.action,
            notAccess: !i.create && !i.read && !i.update && !i.delete && !i.action,
        }))
        setDatasource(items);
    }

    const fetchOptionSave  = (id) => {
        const permission = datasource.find(i => i.id === id);
        const post = {
            permission_id: permission.id,
            group_id: item.id,
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
        console.log(datasource[index]);
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

    useEffect(() => {
        if (item?.name) {
            setTitle(translate('crm.Sidebar.Permissions') + (item?.name ? ' / ' + item?.name : ''))
            fetchList();
        }
    }, [item])

    useEffect(() => {
        servicePermissionItem(id);
    }, [id])


    return (
        <Page
            title={title}
            action={
                <NavLink
                    to={route('app.permission')}
                    className="btn btn--primary space-x-1"
                    type={'button'}
                >
                    <span><FiArrowLeft/></span>
                    <span>{translate('button.Back')}</span>
                </NavLink>
            }
        >
            <Card>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Adı</th>
                        <th style={{width: '150px'}}>Tam səlahiyyət</th>
                        <th style={{width: '150px'}}>Tam məhdudiyyət</th>
                        <th style={{width: '150px'}}>Baxış</th>
                        <th style={{width: '150px'}}>Yarat</th>
                        <th style={{width: '150px'}}>Düzəliş et</th>
                        <th style={{width: '150px'}}>Sil</th>
                        <th style={{width: '150px'}}>Digrə</th>
                    </tr>
                    </thead>
                    <tbody>
                    {datasource.map((i, index) => (
                        <tr key={index}>
                            <td>{i.name}</td>
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
            </Card>
        </Page>
    );
}

export default PermissionOptionPage;
