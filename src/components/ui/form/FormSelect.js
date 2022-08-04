import React from 'react';
import {Select} from "antd";

function FormSelect(
    {
        allowClear = true,
        showSearch = true,
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
        <Select
            type={type}
            allowClear={allowClear}
            showSearch={showSearch}
            bordered={bordered}
            defaultValue={defaultValue}
            onChange={onChange}
            value={value}
            fieldNames={fieldNames}
            filterOption={(input, option) => option[filterKey].toLowerCase().includes(input.toLowerCase())}
            options={options}
            {...props}
        />
    );
}

export default FormSelect;