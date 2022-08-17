import React, {useState} from 'react';
import {DatePicker} from "antd";
import {translate} from "utils/helpers";
import moment from "moment";

const {RangePicker} = DatePicker;

function FormRangePicker(
    {
        allowEmpty,
        value,
        bordered = false,
        defaultValue,
        maxLength,
        showCount,
        onChange,
        format,
        ...props
    }
) {

    const [selected, setSelected] = useState(false);
    const items = [
        {key: 'today', value: [moment(), moment()], text: translate('date.ToDay')},
        {key: 'yesterday', value: [moment().subtract(1, 'days'), moment().subtract(1, 'days')], text: translate('date.Yesterday')},
        {key: 'last-7-days', value: [moment().subtract(6, 'days'), moment()], text: translate('date.Last7Days')},
        {key: 'last-30-days', value: [moment().subtract(29, 'days'), moment()], text: translate('date.Last30Days')},
        {key: 'this-month', value: [moment().startOf('month'), moment().endOf('month')], text: translate('date.ThisMonth')},
        {key: 'last-month', value: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')], text: translate('date.LastMonth')},
        {key: 'all', value: [moment().subtract(2, 'year').startOf("year"), moment()], text: translate('date.All')}
    ];

    const handleClick = (i) => {
        setSelected(i.key);
        onChange(i.value);
    }

    return (
        <RangePicker
            allowEmpty={allowEmpty}
            bordered={bordered}
            showCount={showCount}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={onChange}
            value={value}
            format={format}
            panelRender={(node) => (
                <div className="flex">
                    <div className="flex-1 p-1">
                        {items.map((i, index) => (
                            <button className={`btn dark:text-white btn--sm ${selected === i.key ? 'dark:!text-secondary text-blue-500' : ''}`} key={index} onClick={() => handleClick(i)}>
                                {i.text}
                            </button>
                        ))}
                    </div>
                    <div>{node}</div>
                </div>
            )}
            {...props}
        />
    );
}

export default FormRangePicker;