import React from 'react';
import {Button as AntdButton, Tooltip} from "antd";
import {serviceSetLoadingApp} from "services/app.service";
import {useAppState} from "stores/module/app.store";

function IconElement({icon, hasChildren, iconClass}) {
    if (icon)
        return <i className={`${hasChildren ? 'mr-1 relative top-[1px]' : ''} ${iconClass} ${icon}`}/>
    return false;
}

function Button({
    property,
    icon,
    iconClass,
    children,
    disabled,
    type,
    className,
    tooltip,
    tooltipPlacement,
    onClick,
    block,
    ...props
}) {

    const {loading} = useAppState();
    const handlerOnClick = e => {
        if (onClick && type !== 'submit') onClick(e);
        if (type === 'submit') {
            serviceSetLoadingApp(true);
        }
    }

    return (
        <Tooltip placement={tooltipPlacement} title={tooltip}>
            <AntdButton {...props}
                        htmlType={type}
                        className={`btn btn--${property} ${className || ''} ${block ? 'btn--block' : ''} ${(disabled || loading) ? 'pointer-events-none opacity-80' : ''}`}
                        onClick={(e) => handlerOnClick(e)}
                        loading={loading}
                        icon={<IconElement icon={icon} iconClass={iconClass || ''} hasChildren={!!children}/>}>
                <span className={icon ? 'relative top-[2px]' : ''}>{children}</span>
            </AntdButton>
        </Tooltip>
    );
}

Button.defaultProps = {
    property: 'primary',
    type: 'button',
    tooltipPlacement: 'top',
    disabled: false,
    loading: false,
}

export default React.memo(Button);
