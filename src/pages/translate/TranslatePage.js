import React from 'react';
import {Page} from "components/ui";
import TranslateFilter from "pages/translate/components/TranslateFilter";
import TranslateTable from "pages/translate/components/TranslateTable";
import TranslateFormModal from "pages/translate/components/TranslateFormModal";
import {useTranslateStore} from "store/module/translate.store";
import {can} from "utils/helpers";

function TranslatePage(props) {

    const {visibleFormModal, permission} = useTranslateStore();

    return (
        <Page>
            <div className="space-y-5">
                <TranslateFilter/>
                <TranslateTable/>
                {(visibleFormModal && (can(permission + '.create') || can(permission + '.update'))) && <TranslateFormModal/>}
            </div>
        </Page>
    );
}

export default TranslatePage;
