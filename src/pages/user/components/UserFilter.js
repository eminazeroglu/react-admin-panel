import React, {useEffect, useState} from 'react';
import {Card, FormGroup} from "components/ui";
import {Col, Row} from "antd";
import {FormInput, FormSelect} from "components/ui/form";
import {useUserStore} from "store/module/user.store";
import {translate} from "utils/helpers";
import {serviceUserSetQuery} from "services/user.service";
import {usePermissionStore} from "store/module/permission.store";
import {servicePermissionSelectList} from "services/permission.service";

function UserFilter(props) {

    const {permissions} = usePermissionStore();
    const {translateKey} = useUserStore();
    const initialFilter = {
        fullname: '',
        email: '',
        type: '',
        status: ''
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.fullname) customQuery.fullname = filter.fullname;
        if (filter.email) customQuery.email = filter.email;
        if (filter.permission) customQuery.permission = filter.permission;
        if (filter.status) customQuery.status = filter.status;
        serviceUserSetQuery(customQuery);
        setIsFilter(true);
    }

    const handleReset = () => {
        serviceUserSetQuery(false);
        setFilter(initialFilter);
        setIsFilter(false);
    }

    useEffect(() => {
        servicePermissionSelectList();
    }, [])

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={5}>
                    <FormGroup
                        label={translate(translateKey + '.Label.FullName')}
                    >
                        <FormInput
                            value={filter.fullname}
                            onChange={e => setFilter(f => ({...f, fullname: e.target.value}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={5}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Email')}
                    >
                        <FormInput
                            value={filter.email}
                            onChange={e => setFilter(f => ({...f, email: e.target.value}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={4}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Permission')}
                    >
                        <FormSelect
                            options={permissions}
                            value={filter.permission}
                            onChange={e => setFilter(f => ({...f, permission: e}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={4}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Status')}
                    >
                        <FormInput
                            value={filter.status}
                            onChange={e => setFilter(f => ({...f, status: e.target.value}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={6} className="lg:pt-[25px]">
                    <div className="filter-box-buttons">
                        <button disabled={!Object.keys(filter).filter(i => filter[i]).length} onClick={() => handleFilter()} className="btn btn--primary filter-box-button">
                            {translate( 'button.Filter')}
                        </button>

                        {isFilter > 0 && (
                            <button onClick={() => handleReset()} className="btn btn--red filter-box-button">
                                {translate( 'button.Reset')}
                            </button>
                        )}
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default UserFilter;