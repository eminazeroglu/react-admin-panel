import {NavLink} from "react-router-dom";
import {flatten, route, translate} from "utils/helpers";
import menus from "router/menus";
import {useAppState} from "store/module/app.store";
import {IoArrowForwardSharp} from "@react-icons/all-files/io5/IoArrowForwardSharp";

export default function Page({children, count, breadcrumbFirst, title, action}) {


    const pages = flatten(menus);
    const {currentPage} = useAppState();
    const homePage = pages.find(page => route(page.route) === '/');
    const parentPage = pages.find(page => page.route === currentPage?.parent);

    return (
        <section className="flex flex-col py-8 px-4 lg:px-0">
            <div className="flex lg:justify-between flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0">
                <div className="flex-1">
                    <h2 className="font-bold text-xl dark-text-primary">{title || translate(currentPage?.title)} {count} </h2>
                    <ul className="flex items-center py-3 space-x-2 font-semibold text-sm mb-3">
                        <li className="flex items-center space-x-2">
                            <NavLink to={homePage.path || '/'} className="link dark-link">{breadcrumbFirst || translate(homePage?.title)}</NavLink>
                            <span className="text-gray-300 dark-text-secondary">
                        <IoArrowForwardSharp/>
                    </span>
                        </li>
                        {parentPage && (
                            <li className="flex items-center space-x-2">
                                <span className="text-mute dark-text-secondary">{translate(parentPage?.title)}</span>
                                <span className="text-gray-300 dark-text-secondary">
                            <IoArrowForwardSharp/>
                        </span>
                            </li>
                        )}
                        <li>
                            <span className="text-mute dark-text-secondary">{title || translate(currentPage?.title)}</span>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center lg:justify-end">
                    {action}
                </div>
            </div>

            <div>
                {children}
            </div>
        </section>
    );
}

Page.defaultProps = {
    action: ''
}
