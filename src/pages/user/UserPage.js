import React from 'react';
import {Page} from "components/ui";
import {translate} from "utils/helpers";
import {serviceUserSetVisibleFormModal} from "services/user.service";
import UserFilter from "pages/user/components/UserFilter";
import UserTable from "pages/user/components/UserTable";
import UserFormModal from "pages/user/components/UserFormModal";

function UserPage(props) {
    return (
        <Page
            action={
                <button className="btn btn--primary" onClick={() => serviceUserSetVisibleFormModal(true)}>
                    {translate('button.Add')}
                </button>
            }
        >
            <div className="space-y-5">
                <UserFilter/>
                <UserTable/>
                <UserFormModal/>
            </div>
        </Page>
    );
}

export default UserPage;