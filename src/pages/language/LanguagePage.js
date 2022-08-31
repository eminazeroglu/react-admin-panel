import React from 'react';
import {Page} from "components/ui";
import {translate} from "utils/helpers";
import {serviceLanguageSetModal} from "services/language.service";
import LanguageFilter from "pages/language/components/LanguageFilter";
import LanguageTable from "pages/language/components/LanguageTable";
import LanguageFormModal from "pages/language/components/LanguageFormModal";
import {Button} from "components/ui";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {useLanguageStore} from "store/module/language.store";

function LanguagePage(props) {

    const {visibleFormModal} = useLanguageStore();

    return (
        <Page
            action={
                <Button
                    className="btn btn--primary"
                    onClick={() => serviceLanguageSetModal('form', true)}
                    icon={<FiPlus/>}
                    type={'button'}
                >
                    {translate('button.Add')}
                </Button>
            }
        >
            <div className="space-y-5">
                <LanguageFilter/>
                <LanguageTable/>
                {visibleFormModal && <LanguageFormModal/>}
            </div>
        </Page>
    );
}

export default LanguagePage;
