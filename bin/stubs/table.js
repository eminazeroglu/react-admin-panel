import React, {useEffect} from 'react';
import {use$CLASS_NAME$Store} from "store/module/$FILE_NAME$.store";
import {translate} from "utils/helpers";
import {Dropdown} from "antd";
import {
    service$CLASS_NAME$Destroy,
    service$CLASS_NAME$FetchIndex,
    service$CLASS_NAME$SetQuery,
    service$CLASS_NAME$SetVisibleFormModal,
    service$CLASS_NAME$UpdateAction
} from "services/$FILE_NAME$.service";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import {Card, Table} from "components/ui";

function $CLASS_NAME$Table(props) {
    const {query, dataSource, loading, translateKey} = use$CLASS_NAME$Store();

    const columns = [
        {
            title: translate(translateKey + '.Label.Name'),
            dataIndex: 'name'
        },
    ];

    const actionRender = (row) => {
        const menus = (
            <div className="dropdown dropdown--sm">
                <div className="dropdown-body">
                    <div className="dropdown-items">
                        <button
                            onClick={() => service$CLASS_NAME$SetVisibleFormModal(true, row)}
                            className="dropdown-item h-8"
                        >
                            {translate('button.Edit')}
                        </button>
                        <button
                            className="dropdown-item h-8"
                            onClick={() => service$CLASS_NAME$UpdateAction(row.id)}
                        >
                            {row.is_active ? translate('button.DeActivate') : translate('button.Activate')}
                        </button>
                        <button
                            className="dropdown-item h-8"
                            onClick={() => service$CLASS_NAME$Destroy(row.id)}
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
        service$CLASS_NAME$FetchIndex();
    }, [query])

    return (
        <Card>
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
        </Card>
    );
}

export default $CLASS_NAME$Table;