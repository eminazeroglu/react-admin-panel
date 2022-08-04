export default function Dropdown({children, className}) {
    return (
        <div className={`${className || ''} relative inline-block text-left group`}>
            {children}
        </div>
    );
}
