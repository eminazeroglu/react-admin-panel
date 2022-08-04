import React from 'react';
import './Modal.css'
import {Modal as AntdModal} from 'antd';

function Modal({children, className, title, visible, onClose, onSuccess, ...props}) {

    const handleOk = () => {
        onSuccess();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <AntdModal
            className={className || ''}
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
            footer={false}
            {...props}
        >
            {children}
        </AntdModal>
    );
}

export default React.memo(Modal);
