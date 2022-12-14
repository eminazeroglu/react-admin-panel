import React, {useEffect} from 'react';
import {usePermissionStore} from "store/module/permission.store";
import {can, translate} from "utils/helpers";
import {Badge, Dropdown} from "antd";
import {
    servicePermissionDestroy,
    servicePermissionFetchIndex,
    servicePermissionSetModal,
    servicePermissionSetQuery,
    servicePermissionUpdateAction
} from "services/permission.service";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import {Table} from "components/ui";

function PermissionTable(props) {
    const {query, dataSource, loading, translateKey, permission} = usePermissionStore();

    const columns = [
        {
            title: translate(translateKey + '.Label.Name'),
            dataIndex: 'name'
        },
        {
            title: translate(translateKey + '.Label.Status'),
            dataIndex: 'is_active',
            width: 50,
            align: 'center',
            render: (value, row) => {
                return <Badge className="badge-status" status={row.is_active ? 'success' : 'error'}/>
            }
        },
    ];

    const actionRender = (row) => {
        if (row.id <= 2) return false
        const menus = (
            <div className="dropdown dropdown--sm">
                <div className="dropdown-body">
                    <div className="dropdown-items">
                        {can(permission + '.update') && (
                            <button
                                onClick={() => servicePermissionSetModal('form', true, row)}
                                className="dropdown-item h-8"
                            >
                                {translate('button.Edit')}
                            </button>
                        )}
                        {(can(permission + '.create') || can(permission + '.update')) && (
                            <button
                                onClick={() => servicePermissionSetModal('option', true, row)}
                                className="dropdown-item h-8"
                            >
                                {translate('crm.Permission.Label.Params')}
                            </button>
                        )}
                        {can(permission + '.action') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => servicePermissionUpdateAction(row.id)}
                            >
                                {row.is_active ? translate('button.DeActivate') : translate('button.Activate')}
                            </button>
                        )}
                        {can(permission + '.delete') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => servicePermissionDestroy(row.id)}
                            >
                                {translate('button.Delete')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
        return <Dropdown overlay={menus} placement={'bottomRight'}>
            <button className="btn btn--action bg-gray-100 text-gray-900 dark:bg-transparent dark:text-gray-300">
                <span>
                    <IoEllipsisVerticalSharp/>
                </span>
            </button>
        </Dropdown>
    }

    useEffect(() => {
        servicePermissionFetchIndex();
    }, [query])

    return (
        <Table
            tableQuery={query}
            setTableQuery={servicePermissionSetQuery}
            dataSource={dataSource.data}
            total={dataSource.total}
            columns={columns}
            loading={loading}
            sortingStart={1}
            actionWidth={40}
            actionButton={row => actionRender(row)}
        />
    );
}

export default PermissionTable;
