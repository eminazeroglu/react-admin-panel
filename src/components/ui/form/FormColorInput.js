import React from 'react';
import InputColor from 'react-input-color';

function FormColorInput(
    {
        value,
        onChange,
        placement='right',
        ...props
    }
) {
    return (
        <div className="form-color">
            <InputColor
                onChange={e => onChange(e.hex)}
                initialValue={value}
                placement={placement}
                className={'form-color__button'}
                {...props}
            />
            <div className="form-color__text">
                {value}
            </div>
        </div>
    );
}

export default FormColorInput;
