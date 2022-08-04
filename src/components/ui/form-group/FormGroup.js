import {Tooltip} from "antd";
import {useAppState} from "stores/module/app.store";

export default function FormGroup(
    {
        label,
        labelRight,
        noBorder = false,
        labelClass,
        className,
        prefix,
        prefixClass,
        disabled,
        tooltip,
        suffix,
        suffixClass,
        error,
        required,
        children,
        elementClass,
        elementStyle,
    }
) {

    const {errors} = useAppState();

    let addonClass = '';
    if (prefix && suffix) addonClass = 'form-group--addon';
    else if (prefix) addonClass = 'form-group--addon-prefix';
    else if (suffix) addonClass = 'form-group--addon-suffix';
    return (
        <div
            className={`form-group ${className || ''} ${noBorder ? 'form-group--no-border' : ''} ${errors[error] ? ' form-group--error' : ''} ${addonClass} ${disabled ? 'form-group--disabled' : ''}`}>
            {label && (
                <label className={`form-label ${labelClass || ''} ${labelRight ? 'flex justify-between' : ''}`}>
                    <span className="flex space-x-1">
                        <span dangerouslySetInnerHTML={{__html: label}}/>
                        {(required || error) && (
                            <span className="text-red-500">*</span>
                        )}
                        {tooltip && (
                            <Tooltip title={tooltip}>
                                <i className="icon-info"/>
                            </Tooltip>
                        )}
                    </span>
                    {labelRight || ''}
                </label>
            )}
            <div className={`form-element ${elementClass || ''}`} style={elementStyle}>
                {suffix && <div className={`form-suffix ${suffixClass || ''}`}>{suffix}</div>}
                {children}
                {prefix && <div className={`form-prefix ${prefixClass || ''}`}>{prefix}</div>}
            </div>
            {(errors[error]) && (
                <div className="form-error" dangerouslySetInnerHTML={{__html: errors[error]}}/>
            )}
        </div>
    );
}
