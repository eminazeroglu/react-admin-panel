import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (fontSize = 24) => {
    return <LoadingOutlined style={{ fontSize }} spin />
};

function Loading({children, loading, className, fontSize = 24}) {
    return (
        <>
            {loading && <div className={`w-full h-auto flex justify-center items-center ${className || ''}`}>
                <Spin indicator={antIcon(fontSize)} />
            </div>}
            {!loading && children}
        </>
    );
}

Loading.defaultProps = {
    loading: false
}

export default Loading;