import React, {useEffect} from 'react';
import {use$CLASS_NAME$Store} from "store/module/$FILE_NAME$.store";
import {can, translate} from "utils/helpers";
import {Badge, Dropdown} from "antd";
import {
    service$CLASS_NAME$Destroy,
    service$CLASS_NAME$FetchIndex,
    service$CLASS_NAME$SetModal,
    service$CLASS_NAME$SetQuery,
    service$CLASS_NAME$UpdateAction
} from "services/$FILE_NAME$.service";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import {Table} from "components/ui";

function $CLASS_NAME$Table(props) {
    const {query, dataSource, loading, translateKey, permission} = use$CLASS_NAME$Store();

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
        const menus = (
            <div className="dropdown dropdown--sm">
                <div className="dropdown-body">
                    <div className="dropdown-items">
                        {can(permission + '.update') && (
                            <button
                                onClick={() => service$CLASS_NAME$SetModal('form', true, row)}
                                className="dropdown-item h-8"
                            >
                                {translate('button.Edit')}
                            </button>
                        )}
                        {can(permission + '.action') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => service$CLASS_NAME$UpdateAction(row.id)}
                            >
                                {row.is_active ? translate('button.DeActivate') : translate('button.Activate')}
                            </button>
                        )}
                        {can(permission + '.delete') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => service$CLASS_NAME$Destroy(row.id)}
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
        service$CLASS_NAME$FetchIndex();
    }, [query])

    return (
        <Table
            tableQuery={query}
            setTableQuery={service$CLASS_NAME$SetQuery}
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

export default $CLASS_NAME$Table;
