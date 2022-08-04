import React from 'react';
import {InputNumber} from "antd";

function FormNumber(
    {
        step,
        value,
        bordered = false,
        defaultValue,
        min,
        max,
        onChange,
        ...props
    }
) {
    return (
        <InputNumber
            bordered={bordered}
            step={step}
            defaultValue={defaultValue}
            min={min}
            max={max}
            onChange={onChange}
            value={value}
            {...props}
        />
    );
}

export default FormNumber;