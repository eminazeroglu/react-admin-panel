import {NavLink} from "react-router-dom";
import {flatten} from "utils/helpers";
import routers from "router/routers";
import {useAppState} from "stores/module/app.store";

export default function Page({children, count, breadcrumbFirst, title, action}) {

    const pages = flatten(routers);
    const {currentPage} = useAppState();
    const homePage = pages.find(page => page.path === '/');
    const parentPage = pages.find(page => page.path === currentPage?.parent_path);

    return (
        <section className="flex flex-col py-8 px-4 lg:px-0">
            <div className="flex lg:justify-between flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0">
                <h2 className="font-bold text-xl dark-text-primary">{title || currentPage?.title} {count} </h2>
                <div className="flex items-center lg:justify-end">
                    {action}
                </div>
            </div>
            <ul className="flex items-center py-3 space-x-2 font-semibold text-sm mb-3">
                <li className="flex items-center space-x-2">
                    <NavLink to={homePage.path || '/'} className="link dark-link">{breadcrumbFirst || homePage?.title}</NavLink>
                    <i className="icon-chevron-right text-gray-300 dark-text-secondary"/>
                </li>
                {parentPage && (
                    <li className="flex items-center space-x-2">
                        <span className="text-mute dark-text-secondary">{parentPage?.title}</span>
                        <i className="icon-chevron-right text-gray-300"/>
                    </li>
                )}
                <li>
                    <span className="text-mute dark-text-secondary">{title || currentPage?.title}</span>
                </li>
            </ul>
            <div>
                {children}
            </div>
        </section>
    );
}

Page.defaultProps = {
    action: ''
}
