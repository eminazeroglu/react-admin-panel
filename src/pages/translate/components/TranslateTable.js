import React, {useEffect, useState} from 'react';
import {useTranslateStore} from "store/module/translate.store";
import {translate} from "utils/helpers";
import {
    serviceTranslateFetchIndex,
    serviceTranslateSetModal,
    serviceTranslateSetQuery
} from "services/translate.service";
import {Card, Table} from "components/ui";
import {useLanguageStore} from "store/module/language.store";
import {serviceLanguageSelectList} from "services/language.service";
import {MdTranslate} from "@react-icons/all-files/md/MdTranslate";

function TranslateTable(props) {
    const {query, dataSource, loading} = useTranslateStore();
    const [columns, setColumns] = useState([]);
    const {languages} = useLanguageStore();

    const handlerColumns = () => {
        const cols = [];
        languages.filter(i => i.id).filter(i => {
            const item = {
                title: i.name,
                dataIndex: i.code,
                key: i.id,
                width: 300,
                render: (value, item) => {
                    return translate(item[i.code], {lang: i.code})
                }
            };
            if (i.code === 'az')  {
                item.fixed = 'left'
            }
            cols.push(item)
        })
        setColumns([...cols])
    }

    const actionRender = (row) => {
        return (
            <button className="btn btn--primary btn--action" onClick={e => serviceTranslateSetModal('form', true, row)}>
                <MdTranslate/>
            </button>
        )
    }

    useEffect(() => {
        serviceTranslateFetchIndex();
    }, [query])

    useEffect(() => {
        handlerColumns();
    }, [languages])

    useEffect(() => {
        serviceLanguageSelectList();
    }, [])

    return (
        <Table
            tableQuery={query}
            setTableQuery={serviceTranslateSetQuery}
            dataSource={dataSource.data}
            total={dataSource.total}
            columns={columns}
            loading={loading}
            sortingStart={1}
            actionWidth={40}
            actionFixed={'right'}
            actionButton={row => actionRender(row)}
            scroll={{x: 'max-content'}}
        />
    );
}

export default TranslateTable;
