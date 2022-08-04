import React from 'react';

function Badge({children, className, ...props}) {
    return (
        <span {...props} className={`py-1 px-2 rounded font-bold text-xs whitespace-nowrap ${className || ''}`}>
            {children}
        </span>
    );
}

export default Badge;