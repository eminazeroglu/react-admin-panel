import React from 'react';
import {Button, Page} from "components/ui";
import {can, translate} from "utils/helpers";
import {serviceUserSetModal} from "services/user.service";
import UserFilter from "pages/user/components/UserFilter";
import UserTable from "pages/user/components/UserTable";
import UserFormModal from "pages/user/components/UserFormModal";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {useUserStore} from "store/module/user.store";

function UserPage(props) {

    const {visibleFormModal, permission} = useUserStore();

    return (
        <Page
            action={
                <>
                    {can(permission + '.create') && (
                        <Button
                            className="btn btn--primary"
                            onClick={() => serviceUserSetModal('form', true)}
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
                <UserFilter/>
                <UserTable/>
                {(visibleFormModal && (can(permission + '.create') || can(permission + '.update'))) && <UserFormModal/>}
            </div>
        </Page>
    );
}

export default UserPage;
