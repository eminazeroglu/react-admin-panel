import React from 'react';
import RCPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {translate} from "utils/helpers";

function PhoneInput({value = '', id, onBlur, onChange, country = 'us', ...props}) {
    return (
        <RCPhoneInput
            {...props}
            country={country}
            value={value}
            enableSearch={true}
            enableAreaCodes={true}
            searchPlaceholder={translate('phoneInputComponent.searchPlaceholder')}
            searchNotFound={translate('phoneInputComponent.searchNotFound')}
            onChange={phone => onChange(phone)}
            inputProps={{
                id,
                onBlur
            }}
        />
    );
}

export default PhoneInput;