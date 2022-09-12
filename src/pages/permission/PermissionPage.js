import React from 'react';
import {Page} from "components/ui";
import {can, translate} from "utils/helpers";
import {servicePermissionSetModal} from "services/permission.service";
import PermissionFilter from "pages/permission/components/PermissionFilter";
import PermissionTable from "pages/permission/components/PermissionTable";
import PermissionFormModal from "pages/permission/components/PermissionFormModal";
import {Button} from "components/ui";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {usePermissionStore} from "store/module/permission.store";
import PermissionOptionModal from "pages/permission/components/PermissionOptionModal";

function PermissionPage(props) {

    const {visibleFormModal, visibleOptionModal, permission} = usePermissionStore();

    return (
        <Page
            action={
                <>
                    {can(permission + '.create') && (
                        <Button
                            className="btn btn--primary"
                            onClick={() => servicePermissionSetModal('form', true)}
                            icon={<FiPlus/>}
                            type={'button'}
                        >
                            {translate('button.Add')}
                        </Button>
                    )}
                </>
            }
        >
            <div className="space-y-5">
                <PermissionFilter/>
                <PermissionTable/>
                {(can(permission + '.create') || can(permission + '.update')) && (
                    <>
                        {visibleFormModal && <PermissionFormModal/>}
                        {visibleOptionModal && <PermissionOptionModal/>}
                    </>
                )}
            </div>
        </Page>
    );
}

export default PermissionPage;
