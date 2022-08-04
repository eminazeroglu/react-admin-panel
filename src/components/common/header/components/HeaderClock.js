import React, {useEffect, useState} from "react";
import moment from "moment";
import {translate} from "utils/helpers";
import {FaRegClock} from "@react-icons/all-files/fa/FaRegClock";

function HeaderClock(props) {

    const [clock, setClock] = useState(moment().format('HH:mm'));

    useEffect(() => {
        const intervalTime = setInterval(() => {
            setClock(moment().format('HH:mm'));
        }, 5000)
        return () => {
            clearInterval(intervalTime)
        }
    }, [clock])

    return (
        <div className="header-info-box">
            <div>{translate('crm.Header.Label.Clock')}:</div>
            <div className="flex items-center space-x-1">
                <FaRegClock/>
                <span>{clock}</span>
            </div>
        </div>
    );
}

export default React.memo(HeaderClock)
