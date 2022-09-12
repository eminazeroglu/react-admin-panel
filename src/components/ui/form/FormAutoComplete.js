import React from 'react';
import {AutoComplete} from "antd";

function FormAutoComplete(
    {
        allowClear,
        value,
        type,
        bordered = false,
        onChange,
        options = [],
        fieldNames = {label: 'name', value: 'id'},
        ...props
    }
) {
    return (
        <AutoComplete
            options={options}
            type={type}
            fieldNames={fieldNames}
            allowClear={allowClear}
            bordered={bordered}
            onChange={onChange}
            value={value}
            {...props}
        />
    );
}

export default FormAutoComplete;
