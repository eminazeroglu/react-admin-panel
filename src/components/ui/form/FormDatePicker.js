import React from 'react';
import {DatePicker} from "antd";

function FormRangePicker(
    {
        allowEmpty,
        value,
        bordered = false,
        defaultValue,
        maxLength,
        showCount,
        onChange,
        format,
        ...props
    }
) {

    return (
        <DatePicker
            allowEmpty={allowEmpty}
            bordered={bordered}
            showCount={showCount}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={onChange}
            value={value}
            format={format}
            {...props}
        />
    );
}

export default FormRangePicker;