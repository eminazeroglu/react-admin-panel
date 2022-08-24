import React, {useState} from 'react';
import {Card, FormGroup, Button} from "components/ui";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {use$CLASS_NAME$Store} from "store/module/$FILE_NAME$.store";
import {translate} from "utils/helpers";
import {service$CLASS_NAME$SetQuery} from "services/$FILE_NAME$.service";
import {FiFilter} from "@react-icons/all-files/fi/FiFilter";
import {BiReset} from "@react-icons/all-files/bi/BiReset";

function $CLASS_NAME$Filter(props) {

    const {translateKey} = use$CLASS_NAME$Store();
    const initialFilter = {
        name: '',
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.name) customQuery.name = filter.name;
        service$CLASS_NAME$SetQuery(customQuery);
        setIsFilter(true);
    }

    const handleReset = () => {
        service$CLASS_NAME$SetQuery(false);
        setFilter(initialFilter);
        setIsFilter(false);
    }

    return (
        <Card className="mb-5">
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={5}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Title')}
                    >
                        <FormInput
                            value={filter.fullname}
                            onChange={e => setFilter(f => ({...f, fullname: e.target.value}))}
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

export default $CLASS_NAME$Filter;