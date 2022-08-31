import React from 'react';
import {Page} from "components/ui";
import {translate} from "utils/helpers";
import {service$CLASS_NAME$SetModal} from "services/$FILE_NAME$.service";
import $CLASS_NAME$Filter from "pages/$FILE_NAME$/components/$CLASS_NAME$Filter";
import $CLASS_NAME$Table from "pages/$FILE_NAME$/components/$CLASS_NAME$Table";
import $CLASS_NAME$FormModal from "pages/$FILE_NAME$/components/$CLASS_NAME$FormModal";
import {Button} from "components/ui";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {use$CLASS_NAME$Store} from "store/module/$FILE_NAME$.store";

function $CLASS_NAME$Page(props) {

    const {visibleFormModal} = use$CLASS_NAME$Store();

    return (
        <Page
            action={
                <Button
                    className="btn btn--primary"
                    onClick={() => service$CLASS_NAME$SetModal('form', true)}
                    icon={<FiPlus/>}
                    type={'button'}
                >
                    {translate('button.Add')}
                </Button>
            }
        >
            <div className="space-y-5">
                <$CLASS_NAME$Filter/>
                <$CLASS_NAME$Table/>
                {visibleFormModal && <$CLASS_NAME$FormModal/>}
            </div>
        </Page>
    );
}

export default $CLASS_NAME$Page;
