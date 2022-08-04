import React from 'react';
import {Input} from "antd";

function FormInput(
    {
        allowClear,
        value,
        type,
        bordered = false,
        defaultValue,
        maxLength,
        showCount,
        onChange,
        ...props
    }
) {
    return (
        <Input
            type={type}
            allowClear={allowClear}
            bordered={bordered}
            showCount={showCount}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={onChange}
            value={value}
            {...props}
        />
    );
}

export default FormInput;