import React from 'react';
import {Page} from "components/ui";
import MenuFilter from "pages/menu/components/MenuFilter";
import MenuTable from "pages/menu/components/MenuTable";
import MenuFormModal from "pages/menu/components/MenuFormModal";
import {can, translate} from "utils/helpers";
import {serviceMenuSetVisibleFormModal} from "services/menu.service";
import MenuWidgetModal from "pages/menu/components/MenuWidgetModal";
import {useMenuStore} from "store/module/menu.store";

function MenuPage(props) {

    const {visibleWidgetModal, visibleFormModal, permission} = useMenuStore();

    return (
        <Page
            action={
                <>
                    {can(permission + '.create') && (
                        <button className="btn btn--primary" onClick={() => serviceMenuSetVisibleFormModal(true)}>
                            {translate('button.Add')}
                        </button>
                    )}
                </>
            }
        >
            <MenuFilter/>
            <MenuTable/>
            {(can(permission + '.create') || can(permission + '.update')) && (
                <>
                    {visibleFormModal && <MenuFormModal/>}
                    {visibleWidgetModal && <MenuWidgetModal/>}
                </>
            )}

        </Page>
    );
}

export default MenuPage;
