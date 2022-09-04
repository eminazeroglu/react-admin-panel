import React, {useEffect} from 'react';
import {useUserStore} from "store/module/user.store";
import {translate} from "utils/helpers";
import {Badge, Dropdown} from "antd";
import {
    serviceUserDestroy,
    serviceUserFetchIndex,
    serviceUserSetModal,
    serviceUserSetQuery,
    serviceUserUpdateAction
} from "services/user.service";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import {Card, Table} from "components/ui";
import {BsUnlock} from "@react-icons/all-files/bs/BsUnlock";
import {BsLock} from "@react-icons/all-files/bs/BsLock";

function UserTable(props) {
    const {query, dataSource, loading, translateKey} = useUserStore();

    const columns = [
        {
            title: translate(translateKey + '.Label.FullName'),
            dataIndex: 'fullname'
        },
        {
            title: translate(translateKey + '.Label.Email'),
            dataIndex: 'email',
        },
        {
            title: translate(translateKey + '.Label.Permission'),
            dataIndex: 'permission_group',
            render: value => {
                return value?.name || '-'
            }
        },
        {
            title: translate(translateKey + '.Label.Status'),
            dataIndex: 'status',
            width: 50,
            align: 'center',
            render: (value, row) => {
                return <Badge className="badge-status" status={row.is_active ? 'success' : 'error'} />
            }
        },
        {
            title: translate(translateKey + '.Label.SystemStatus'),
            dataIndex: 'status',
            width: 50,
            align: 'center',
            render: (value, row) => {
                return <div className="flex justify-center">
                    {row.is_block ? <BsLock/> : <BsUnlock/>}
                </div>
            }
        },
    ];

    const actionRender = (row) => {
        const menus = (
            <div className="dropdown dropdown--sm">
                <div className="dropdown-body">
                    <div className="dropdown-items">
                        <button
                            onClick={() => serviceUserSetModal('form', true, row)}
                            className="dropdown-item h-8"
                        >
                            {translate('button.Edit')}
                        </button>
                        <button
                            className="dropdown-item h-8"
                            onClick={() => serviceUserUpdateAction(row.id)}
                        >
                            {row.is_active ? translate('button.DeActivate') : translate('button.Activate')}
                        </button>
                        <button
                            className="dropdown-item h-8"
                            onClick={() => serviceUserUpdateAction(row.id, 'is_block')}
                        >
                            {row.is_block ? translate('button.UserUnBlock') : translate('button.UserBlock')}
                        </button>
                        <button
                            className="dropdown-item h-8"
                            onClick={() => serviceUserDestroy(row.id)}
                        >
                            {translate('button.Delete')}
                        </button>
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
        serviceUserFetchIndex();
    }, [query])

    return (
        <Table
            tableQuery={query}
            setTableQuery={serviceUserSetQuery}
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

export default UserTable;
