import React from 'react';
import classNames from "classnames";

function FormRead({children, pre}) {
    return (
        <div
            className={classNames({
                'px-[11px] py-[4px]': true,
                'whitespace-pre-line': pre
            })}
            dangerouslySetInnerHTML={{__html: children}}
        />
    );
}

export default FormRead;