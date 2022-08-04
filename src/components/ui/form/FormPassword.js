import React from 'react';
import {Input} from "antd";

function FormPassword(
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
        <Input.Password
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

export default FormPassword;