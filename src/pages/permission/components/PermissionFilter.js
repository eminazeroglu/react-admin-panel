import React, {useState} from 'react';
import {Card, FormGroup, Button} from "components/ui";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {usePermissionStore} from "store/module/permission.store";
import {translate} from "utils/helpers";
import {servicePermissionSetQuery} from "services/permission.service";
import {FiFilter} from "@react-icons/all-files/fi/FiFilter";
import {BiReset} from "@react-icons/all-files/bi/BiReset";

function PermissionFilter(props) {

    const {translateKey} = usePermissionStore();
    const initialFilter = {
        name: '',
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.name) customQuery.name = filter.name;
        servicePermissionSetQuery(customQuery);
        setIsFilter(true);
    }

    const handleReset = () => {
        servicePermissionSetQuery(false);
        setFilter(initialFilter);
        setIsFilter(false);
    }

    return (
        <Card className="mb-5">
            <div className="flex items-center justify-between space-x-5">
                <div className="flex-1">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={24}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Name')}
                            >
                                <FormInput
                                    value={filter.name}
                                    onChange={e => setFilter(f => ({...f, name: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="filter-box-buttons lg:pt-[25px]">
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
            </div>
        </Card>
    );
}

export default PermissionFilter;
