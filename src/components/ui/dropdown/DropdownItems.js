import {useEffect, useState} from "react";

export default function DropdownItems({children, className, position}) {
    const customClass = 'origin-top-right top-full right-0 h-[fit-content] absolute z-50 w-full rounded-md drop-shadow bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible focus:outline-none dark-bg-primary dark:border dark-border';
    let [positionClass, setPositionClass] = useState('');
    useEffect(() => {
        if (position === 'left') {
            setPositionClass('left-0');
        }
        else if (position === 'right') {
            setPositionClass('right-full');
        }
    }, [position])

    return (
        <div className={customClass + ' ' + className + ' ' + positionClass} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            {children}
        </div>
    );
}

DropdownItems.defaultProps = {
    position: 'right'
}
