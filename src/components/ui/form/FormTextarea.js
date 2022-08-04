import React from 'react';
import {Input} from "antd";

function FormTextarea(
    {
        allowClear,
        value,
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

export default FormTextarea;