import React, {useEffect} from 'react';
import {Table} from "components/ui";
import {useMenuStore} from "store/module/menu.store";
import {can, translate} from "utils/helpers";
import {
    serviceMenuDestroy,
    serviceMenuFetchIndex,
    serviceMenuSetQuery,
    serviceMenuSetVisibleFormModal,
    serviceMenuUpdateAction
} from "services/menu.service";
import {Badge, Dropdown} from "antd";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";

function MenuTable(props) {

    const {query, dataSource, loading, translateKey, permission} = useMenuStore();

    const columns = [
        {
            title: translate(translateKey + '.Label.Name'),
            dataIndex: 'name'
        },
        {
            title: translate(translateKey + '.Label.Parent'),
            dataIndex: 'parent',
            render: value => {
                return value?.name || '-'
            }
        },
        {
            title: translate(translateKey + '.Label.Link'),
            dataIndex: 'link'
        },
        {
            title: translate(translateKey + '.Label.Type'),
            dataIndex: 'type'
        },
        {
            title: translate(translateKey + '.Label.Position'),
            dataIndex: 'position',
            width: 50,
            align: 'center'
        },
        {
            title: translate(translateKey + '.Label.Status'),
            dataIndex: 'status',
            width: 50,
            align: 'center',
            render: (value, row) => {
                return <Badge className="badge-status" status={row.is_active ? 'success' : 'error'}/>
            }
        },
    ];

    const actionRender = (row) => {
        const menus = (
            <div className="dropdown dropdown--sm">
                <div className="dropdown-body">
                    <div className="dropdown-items">
                        {can(permission + '.update') && (
                            <button
                                onClick={() => serviceMenuSetVisibleFormModal(true, row)}
                                className="dropdown-item h-8"
                            >
                                {translate('button.Edit')}
                            </button>
                        )}
                        {can(permission + '.action') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => serviceMenuUpdateAction(row.id)}
                            >
                                {row.is_active ? translate('button.DeActivate') : translate('button.Activate')}
                            </button>
                        )}
                        {can(permission + '.delete') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => serviceMenuDestroy(row.id)}
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
        serviceMenuFetchIndex();
    }, [])

    return (
        <Table
            tableQuery={query}
            setTableQuery={serviceMenuSetQuery}
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

export default MenuTable;
