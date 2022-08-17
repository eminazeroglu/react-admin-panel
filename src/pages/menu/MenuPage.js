import React from 'react';
import {Page} from "components/ui";
import MenuFilter from "pages/menu/components/MenuFilter";
import MenuTable from "pages/menu/components/MenuTable";
import MenuFormModal from "pages/menu/components/MenuFormModal";
import {translate} from "utils/helpers";
import {serviceMenuSetVisibleFormModal} from "services/menu.service";

function MenuPage(props) {
    return (
        <Page
            action={
               <button className="btn btn--primary" onClick={() => serviceMenuSetVisibleFormModal(true)}>
                   {translate('button.Add')}
               </button>
            }
        >
            <MenuFilter/>
            <MenuTable/>
            <MenuFormModal/>
        </Page>
    );
}

export default MenuPage;