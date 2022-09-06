import React from 'react';
import {TimePicker} from "antd";
import {translate} from "utils/helpers";

function FormTimePicker(
    {
        allowEmpty,
        value,
        bordered = false,
        defaultValue,
        maxLength,
        showCount,
        onChange,
        format,
        picker = 'date',
        ...props
    }
) {

    return (
        <TimePicker
            allowEmpty={allowEmpty}
            bordered={bordered}
            showCount={showCount}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={onChange}
            value={value}
            format={format}
            picker={picker}
            placeholder={translate('component.SelectDate')}
            {...props}
        />
    );
}

export default FormTimePicker;
