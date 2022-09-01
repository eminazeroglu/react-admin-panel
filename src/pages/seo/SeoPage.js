import React from 'react';
import {Page} from "components/ui";
import {translate} from "utils/helpers";
import {serviceSeoSetModal} from "services/seo.service";
import SeoFilter from "pages/seo/components/SeoFilter";
import SeoTable from "pages/seo/components/SeoTable";
import SeoFormModal from "pages/seo/components/SeoFormModal";
import {Button} from "components/ui";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {useSeoStore} from "store/module/seo.store";

function SeoPage(props) {

    const {visibleFormModal} = useSeoStore();

    return (
        <Page
            action={
                <Button
                    className="btn btn--primary"
                    onClick={() => serviceSeoSetModal('form', true)}
                    icon={<FiPlus/>}
                    type={'button'}
                >
                    {translate('button.Add')}
                </Button>
            }
        >
            <div className="space-y-5">
                <SeoFilter/>
                <SeoTable/>
                {visibleFormModal && <SeoFormModal/>}
            </div>
        </Page>
    );
}

export default SeoPage;
