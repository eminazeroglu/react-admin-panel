import React from 'react';
import {Page} from "components/ui";
import TranslateFilter from "pages/translate/components/TranslateFilter";
import TranslateTable from "pages/translate/components/TranslateTable";
import TranslateFormModal from "pages/translate/components/TranslateFormModal";
import {useTranslateStore} from "store/module/translate.store";

function TranslatePage(props) {

    const {visibleFormModal} = useTranslateStore();

    return (
        <Page>
            <div className="space-y-5">
                <TranslateFilter/>
                <TranslateTable/>
                {visibleFormModal && <TranslateFormModal/>}
            </div>
        </Page>
    );
}

export default TranslatePage;
