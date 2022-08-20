import React from 'react';
import {Page} from "components/ui";
import {translate} from "utils/helpers";
import {service$CLASS_NAME$SetVisibleFormModal} from "services/$FILE_NAME$.service";
import $CLASS_NAME$Filter from "pages/$FILE_NAME$/components/$CLASS_NAME$Filter";
import $CLASS_NAME$Table from "pages/$FILE_NAME$/components/$CLASS_NAME$Table";
import $CLASS_NAME$FormModal from "pages/$FILE_NAME$/components/$CLASS_NAME$FormModal";

function $CLASS_NAME$Page(props) {
    return (
        <Page
            action={
                <button className="btn btn--primary" onClick={() => service$CLASS_NAME$SetVisibleFormModal(true)}>
                    {translate('button.Add')}
                </button>
            }
        >
            <div className="space-y-5">
                <$CLASS_NAME$Filter/>
                <$CLASS_NAME$Table/>
                <$CLASS_NAME$FormModal/>
            </div>
        </Page>
    );
}

export default $CLASS_NAME$Page;