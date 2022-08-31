import React from 'react';
import {TreeSelect} from "antd";

function FormTreeSelect(
    {
        allowClear = true,
        showSearch = true,
        treeDefaultExpandAll = true,
        value,
        type,
        bordered = false,
        defaultValue,
        onChange,
        options = [],
        fieldNames = {label: 'name', value: 'id'},
        filterKey = 'name',
        ...props
    }
) {
    return (
        <TreeSelect
            treeDefaultExpandAll={treeDefaultExpandAll}
            allowClear={allowClear}
            bordered={bordered}
            defaultValue={defaultValue}
            onChange={onChange}
            value={value}
            fieldNames={fieldNames}
            treeData={options}
            {...props}
        />
    );
}

export default FormTreeSelect;
