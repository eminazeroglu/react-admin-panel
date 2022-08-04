import {NavLink} from "react-router-dom";

export default function DropdownItem({children, className, path, onClick}) {
    const customClass = 'text-gray-700 text-left overflow-hidden block px-4 w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-700';

    const navLink = () => {
        return <NavLink className={customClass + ' ' + className} role="menuitem" tabIndex="-1" to={path}>{children}</NavLink>
    }

    const Button = () => {
        return <button className={customClass + ' ' + className} onClick={onClick} role="menuitem" tabIndex="-1">{children}</button>
    }

    return path ? navLink() : Button();
}

DropdownItem.defalutProps = {
    path: '',
    onClick: ''
}
