import React, {useEffect, useState} from 'react';
import {Button, Card, FormGroup} from "components/ui";
import {Col, Row} from "antd";
import {FormTreeSelect} from "components/ui/form";
import {useTranslateStore} from "store/module/translate.store";
import {translate} from "utils/helpers";
import {serviceTranslateKeys, serviceTranslateSetQuery} from "services/translate.service";
import {FiFilter} from "@react-icons/all-files/fi/FiFilter";
import {BiReset} from "@react-icons/all-files/bi/BiReset";

function TranslateFilter(props) {

    const {translateKeys} = useTranslateStore();
    const initialFilter = {
        key: '',
    }
    const [filter, setFilter] = useState(initialFilter);
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        const customQuery = {};
        if (filter.key) customQuery.key = filter.key;
        serviceTranslateSetQuery(customQuery);
        setIsFilter(true);
    }

    const handleReset = () => {
        serviceTranslateSetQuery(false);
        setFilter(initialFilter);
        setIsFilter(false);
    }

    useEffect(() => {
        serviceTranslateKeys();
    }, [])

    return (
        <Card className="mb-5">
            <div className="filter-box">
                <div className="flex-1">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={24}>
                            <FormGroup
                                label={translate('crm.Language.Label.TranslateKey')}
                            >
                                <FormTreeSelect
                                    options={translateKeys}
                                    fieldNames={{label: 'name', value: 'key'}}
                                    value={filter.key}
                                    onChange={e => setFilter(f => ({...f, key: e}))}
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

export default TranslateFilter;
