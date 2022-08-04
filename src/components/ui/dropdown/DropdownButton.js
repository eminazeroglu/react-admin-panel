export default function DropdownButton({children, className, iconClass}) {
    const customClass = 'inline-flex items-center space-x-1 justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none';
    return (
        <button type="button" className={customClass + ' ' + className} id="menu-button" aria-expanded="true" aria-haspopup="true">
            {children}
            <i className={'icon-chevron-down ' + iconClass}/>
        </button>
    );
}
