import React, {useEffect, useState} from 'react';
import {Button, Card, FormGroup} from "components/ui";
import {Col, Row} from "antd";
import {FormInput, FormSelect} from "components/ui/form";
import {useUserStore} from "store/module/user.store";
import {translate} from "utils/helpers";
import {serviceUserSetQuery} from "services/user.service";
import {usePermissionStore} from "store/module/permission.store";
import {servicePermissionSelectList} from "services/permission.service";
import {FiFilter} from "@react-icons/all-files/fi/FiFilter";
import {BiReset} from "@react-icons/all-files/bi/BiReset";

function UserFilter(props) {

    const {permissions} = usePermissionStore();
    const {translateKey} = useUserStore();
    const initialFilter = {
        fullname: '',
        email: '',
        permission: ''
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.fullname) customQuery.fullname = filter.fullname;
        if (filter.email) customQuery.email = filter.email;
        if (filter.permission) customQuery.permission = filter.permission;
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
                <Col xs={24} lg={6}>
                    <FormGroup
                        label={translate(translateKey + '.Label.FullName')}
                    >
                        <FormInput
                            value={filter.fullname}
                            onChange={e => setFilter(f => ({...f, fullname: e.target.value}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={6}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Email')}
                    >
                        <FormInput
                            value={filter.email}
                            onChange={e => setFilter(f => ({...f, email: e.target.value}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={6}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Permission')}
                    >
                        <FormSelect
                            allowClear={false}
                            options={permissions}
                            value={filter.permission}
                            onChange={e => setFilter(f => ({...f, permission: e}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={6} className="lg:pt-[25px]">
                    <div className="filter-box-buttons">
                        <Button
                            disabled={!Object.keys(filter).filter(i => filter[i]).length}
                            onClick={() => handleFilter()}
                            className="filter-box-button"
                            icon={<FiFilter/>}
                        >
                            {translate( 'button.Filter')}
                        </Button>

                        {isFilter > 0 && (
                            <Button
                                onClick={() => handleReset()}
                                className="filter-box-button"
                                property={'red'}
                                icon={<BiReset/>}
                            >
                                {translate( 'button.Reset')}
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default UserFilter;