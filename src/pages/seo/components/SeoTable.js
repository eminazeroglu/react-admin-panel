import React, {useEffect} from 'react';
import {useSeoStore} from "store/module/seo.store";
import {translate} from "utils/helpers";
import {Dropdown} from "antd";
import {serviceSeoDestroy, serviceSeoFetchIndex, serviceSeoSetModal, serviceSeoSetQuery} from "services/seo.service";
import {IoEllipsisVerticalSharp} from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import {Badge, Card, Table} from "components/ui";

function SeoTable(props) {
    const {query, dataSource, loading, translateKey} = useSeoStore();

    const columns = [
        {
            title: translate(translateKey + '.Label.Url'),
            dataIndex: 'url'
        },
        {
            title: translate(translateKey + '.Label.Title'),
            dataIndex: 'title'
        },
        {
            title: translate(translateKey + '.Label.Description'),
            dataIndex: 'description'
        },
        {
            title: translate(translateKey + '.Label.Keywords'),
            dataIndex: 'keywords',
            render: value => {
                const arr = value.split(',');
                return (
                    <div className="space-x-2">
                        {arr.map((i, index) => (
                            <Badge key={index} className="status status-blue">{i}</Badge>
                        ))}
                    </div>
                )
            }
        },
        {
            title: translate(translateKey + '.Label.Bots'),
            dataIndex: 'bots',
            render: (value) => {
                return <>
                    {Object.keys(value).map((i, index) => (
                        <p key={index}>
                            <b>{i}: </b>
                            <span>{value[i]}</span>
                        </p>
                    ))}
                </>
            }
        },
    ];

    const actionRender = (row) => {
        const menus = (
            <div className="dropdown dropdown--sm">
                <div className="dropdown-body">
                    <div className="dropdown-items">
                        <button
                            onClick={() => serviceSeoSetModal('form', true, row)}
                            className="dropdown-item h-8"
                        >
                            {translate('button.Edit')}
                        </button>
                        <button
                            className="dropdown-item h-8"
                            onClick={() => serviceSeoDestroy(row.id)}
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
        serviceSeoFetchIndex();
    }, [query])

    return (
        <Card>
            <Table
                tableQuery={query}
                setTableQuery={serviceSeoSetQuery}
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

export default SeoTable;
