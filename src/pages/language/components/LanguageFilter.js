import React, {useState} from 'react';
import {Card, FormGroup, Button} from "components/ui";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {useLanguageStore} from "store/module/language.store";
import {translate} from "utils/helpers";
import {serviceLanguageSetQuery} from "services/language.service";
import {FiFilter} from "@react-icons/all-files/fi/FiFilter";
import {BiReset} from "@react-icons/all-files/bi/BiReset";

function LanguageFilter(props) {

    const {translateKey} = useLanguageStore();
    const initialFilter = {
        name: '',
        code: '',
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.name) customQuery.name = filter.name;
        if (filter.code) customQuery.code = filter.code;
        serviceLanguageSetQuery(customQuery);
        setIsFilter(true);
    }

    const handleReset = () => {
        serviceLanguageSetQuery(false);
        setFilter(initialFilter);
        setIsFilter(false);
    }

    return (
        <Card className="mb-5">
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={9}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Name')}
                    >
                        <FormInput
                            value={filter.name}
                            onChange={e => setFilter(f => ({...f, name: e.target.value}))}
                        />
                    </FormGroup>
                </Col>
                <Col xs={24} lg={9}>
                    <FormGroup
                        label={translate(translateKey + '.Label.Code')}
                    >
                        <FormInput
                            value={filter.code}
                            onChange={e => setFilter(f => ({...f, code: e.target.value}))}
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

export default LanguageFilter;