import React from 'react';
import {Col, Row, Skeleton as AntdSkeleton} from "antd";

function Skeleton({children, loading, count = 1, gutter = [25, 25]}) {
    return (
        <>
            {loading && (
                <>
                    {count === 1 && <AntdSkeleton active={true}/>}
                    {count > 1 && (
                        <Row gutter={gutter}>
                            {Array.from(Array(count).keys()).map((i) => (
                                <Col span={Math.ceil(24 / count)} key={i}>
                                    <AntdSkeleton active={true}/>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
            {!loading && children}
        </>
    );
}

export default Skeleton;