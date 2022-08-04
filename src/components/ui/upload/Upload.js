import React, {useEffect, useState} from 'react';
import {translate} from "utils/helpers";
import {Upload as AntdUpload} from "antd";

function Upload({fileList = [], onChange, id, onBlur, setErrors, format = false}) {

    const [value, setValue] = useState(false);

    const uploadProps = {
        onRemove: (file) => {
            setValue('');
        },
        beforeUpload: (file) => {
            setValue(file);
            setErrors('');
            if (format && !format.includes(file.type)) {
                setErrors(translate('validations.invalidFile'));
                return false;
            }
            setValue(file);
            return false;
        },
        fileList,
    };

    useEffect(() => {
        if (onChange) onChange(value);
    }, [value])

    return (
        <AntdUpload
            {...uploadProps}
            className="w-full"
            id={id}
        >
            <button type="button" className="form-element border-none !h-[38px] w-full px-3 space-x-2">
                <i className="icon-upload"/>
                <span>{translate('buttons.selectFile')}</span>
            </button>
        </AntdUpload>
    );
}

export default Upload;