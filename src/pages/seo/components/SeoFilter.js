import React, {useState} from 'react';
import {Card, FormGroup, Button} from "components/ui";
import {Col, Row} from "antd";
import {FormInput} from "components/ui/form";
import {useSeoStore} from "store/module/seo.store";
import {translate} from "utils/helpers";
import {serviceSeoSetQuery} from "services/seo.service";
import {FiFilter} from "@react-icons/all-files/fi/FiFilter";
import {BiReset} from "@react-icons/all-files/bi/BiReset";

function SeoFilter(props) {

    const {translateKey} = useSeoStore();
    const initialFilter = {
        title: '',
        url: ''
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.title) customQuery.title = filter.title;
        if (filter.url) customQuery.url = filter.url;
        serviceSeoSetQuery(customQuery);
        setIsFilter(true);
    }

    const handleReset = () => {
        serviceSeoSetQuery(false);
        setFilter(initialFilter);
        setIsFilter(false);
    }

    return (
        <Card className="mb-5">
            <div className="filter-box">
                <div className="flex-1">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Title')}
                            >
                                <FormInput
                                    value={filter.title}
                                    onChange={e => setFilter(f => ({...f, title: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={24} lg={12}>
                            <FormGroup
                                label={translate(translateKey + '.Label.Url')}
                            >
                                <FormInput
                                    value={filter.url}
                                    onChange={e => setFilter(f => ({...f, url: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="filter-box-buttons lg:pt-[25px]">
                    <Button
                        disabled={!Object.keys(filter).filter(i => filter[i].toString().trim()).length}
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

export default SeoFilter;
