export default function Card({title, subTitle, titleClass, headerRender, children, className, bodyClass, headerClass}) {
    return (
        <section className={`flex flex-col bg-white border border-gray-200 rounded dark-bg-secondary dark-border ${className || ''}`}>
            {(subTitle || title) && (
                <div className={`flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:items-center justify-between px-5 py-3 border-b border-gray-200 dark-border ${headerClass || ''}`}>
                    <div className="flex flex-col justify-center space-y-2 w-full">
                        <h4 className={`text-mute font-bold text-base uppercase w-full dark-text-primary ${titleClass || ''}`} lang={'az'}>{title}</h4>
                        {subTitle && <div className="text-mute dark-text-secondary">{subTitle}</div>}
                    </div>
                    {headerRender && (
                        <div>
                            {headerRender}
                        </div>
                    )}
                </div>
            )}
            <div className={`px-5 py-3 overflow-x-auto ${bodyClass || ''}`}>
                {children}
            </div>
        </section>
    );
}
