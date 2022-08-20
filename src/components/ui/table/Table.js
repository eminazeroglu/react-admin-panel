import {Table as AntdTable} from "antd";
import {translate} from "utils/helpers";
import {useEffect, useState} from "react";

export default function Table({
                                  columns,
                                  dataSource,
                                  total,
                                  key,
                                  loading,
                                  onChecked,
                                  tableQuery,
                                  setTableQuery,
                                  rowSelection = [],
                                  actionButton,
                                  actionTitle,
                                  actionWidth,
                                  selected,
                                  sortingStart,
                                  limitPages = [10, 25, 50, 100]
                              }) {

    const [tableColumns, setTableColumns] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const tableDataInfo = translate('datatable.PageShow')
        .replace('{count}', new Intl.NumberFormat().format(total))
        .replace('{from}', tableQuery.page > 1 ? (((parseFloat(tableQuery.limit) * parseFloat(tableQuery.page)) - tableQuery.limit)+1) : tableQuery.page)
        .replace('{to}', tableQuery.page > 1 ? (parseFloat(tableQuery.limit) * parseFloat(tableQuery.page)) : parseFloat(tableQuery.limit));

    const handleTableChange = (pagination, filters, sorter) => {
        const columnIndex = columns.findIndex(i => i.dataIndex === sorter.field);
        setCurrentPage(pagination.current);

        const customQuery = {
            limit: parseFloat(tableQuery.limit),
            page: pagination.current || 1,
            ...filters,
        };

        if (columnIndex >= 0) {
            let column = columnIndex + 1;
            let dir = sorter.order === 'ascend' ? 'asc' : 'desc'
            if (onChecked) column += 1;
            if (sortingStart) column += sortingStart;
            customQuery.orderColumn = column;
            customQuery.orderDirection = dir;
        }

        setTableQuery(customQuery);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleChangeLimit = limit => {
        setCurrentPage(1);
        setTableQuery({
            ...tableQuery,
            page: 1,
            limit
        });
    }

    useEffect(() => {
        if (actionButton) {
            const find = columns.find(i => i.dataIndex === 't_action');
            if (!find) {
                columns.push({
                    title: actionTitle || '',
                    dataIndex: 'action',
                    width: actionWidth || 100,
                    key: 't_action',
                    align: 'center',
                    render: (text, record, index) => (
                        actionButton({
                            ...record,
                            tableIndex: index
                        })
                    )
                });
            }
        }
        setTableColumns(columns);
    }, [columns])

    return (
        <section className="flex flex-col space-y-5">
            <div
                className="flex flex-col lg:flex-row justify-between lg:items-center dark-text-secondary space-y-2 lg:space-y-0">
                <div className="flex whitespace-nowrap items-center space-x-1 font-semibold">
                    <span>{translate('datatable.LengthMenu1')}</span>
                    <select className="select-box !w-auto" value={tableQuery.limit}
                            onChange={e => handleChangeLimit(e.target.value)}>
                        {limitPages.limit && limitPages.map((i, index) => (
                            <option value={i} key={index}>{i}</option>
                        ))}
                    </select>
                    <span>{translate('datatable.LengthMenu2')}</span>
                </div>
                <div>
                    {total > 0 && (
                        <p className="font-semibold">{tableDataInfo}</p>
                    )}
                </div>
            </div>
            <div>
                <AntdTable
                    locale={translate('datatable')}
                    bordered
                    className={'ui-table'}
                    columns={tableColumns}
                    dataSource={dataSource}
                    size={'small'}
                    rowKey={record => key ? record[key] : (record['id'] || Math.random())}
                    onChange={handleTableChange}
                    loading={loading}
                    pagination={total > tableQuery.limit ? {
                        current: currentPage,
                        pageSize: tableQuery?.limit,
                        size: 'small',
                        position: ['bottomRight'],
                        total
                    } : false}
                    rowSelection={selected ? {
                        type: 'checkbox',
                        selectedRowKeys: rowSelection,
                        onChange: (selectedRowKeys, selectedRows) => {
                            if (onChecked) onChecked(selectedRows);
                        }
                    } : ''}
                />
            </div>
        </section>
    )
}

Table.defaultProps = {
    dataSource: [],
    loading: false,
    selected: false,
    key: 'id'
}
