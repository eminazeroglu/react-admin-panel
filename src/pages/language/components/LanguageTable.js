import React, {useEffect} from 'react';
import {useLanguageStore} from "store/module/language.store";
import {can, translate} from "utils/helpers";
import {Badge, Dropdown} from "antd";
import {
    serviceLanguageDestroy,
    serviceLanguageFetchIndex,
    serviceLanguageSetModal,
    serviceLanguageSetQuery,
    serviceLanguageUpdateAction
} from "services/language.service";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import {Table} from "components/ui";

function LanguageTable(props) {
    const {query, dataSource, loading, translateKey, permission} = useLanguageStore();

    const columns = [
        {
            title: translate(translateKey + '.Label.Name'),
            dataIndex: 'name'
        },
        {
            title: translate(translateKey + '.Label.Code'),
            dataIndex: 'code'
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
                                onClick={() => serviceLanguageSetModal('form', true, row)}
                                className="dropdown-item h-8"
                            >
                                {translate('button.Edit')}
                            </button>
                        )}
                        {can(permission + '.action') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => serviceLanguageUpdateAction(row.id)}
                            >
                                {row.is_active ? translate('button.DeActivate') : translate('button.Activate')}
                            </button>
                        )}
                        {can(permission + '.delete') && (
                            <button
                                className="dropdown-item h-8"
                                onClick={() => serviceLanguageDestroy(row.id)}
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
        serviceLanguageFetchIndex();
    }, [query])

    return (
        <Table
            tableQuery={query}
            setTableQuery={serviceLanguageSetQuery}
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

export default LanguageTable;
