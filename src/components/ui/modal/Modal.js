import React from 'react';
import './Modal.css'
import {Modal as AntdModal} from 'antd';

function Modal({children, className, backdrop = false, title, visible, onClose, onSuccess, ...props}) {

    const handleOk = () => {
        onSuccess();
    };

    const handleCancel = (e) => {
        const obj = e.target.closest('.ant-modal-close') ? e.target.closest('.ant-modal-close') : e.target;
        if (!backdrop || obj.classList.contains('ant-modal-close'))
            onClose();
    };

    return (
        <AntdModal
            className={className || ''}
            title={title}
            open={visible}
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
