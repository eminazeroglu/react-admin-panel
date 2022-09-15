import React from 'react';
import {Select} from "antd";

function FormSelect(
    {
        allowClear = true,
        showSearch = true,
        value,
        type,
        bordered = false,
        ajaxSearch = false,
        defaultValue,
        onChange,
        onSearch,
        onClear,
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
            onSearch={onSearch}
            onClear={onClear}
            fieldNames={fieldNames}
            filterOption={(!ajaxSearch && !onSearch) ? (input, option) => option[filterKey].toLowerCase().includes(input.toLowerCase()) : false}
            options={options}
            {...props}
        />
    );
}

export default FormSelect;
