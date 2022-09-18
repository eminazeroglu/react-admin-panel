import React from 'react';
import {FiCalendar} from "@react-icons/all-files/fi/FiCalendar";
import {FiArrowUp} from "@react-icons/all-files/fi/FiArrowUp";
import {FiArrowDown} from "@react-icons/all-files/fi/FiArrowDown";

function BrowserStats({icon, title, count = 0, percent, barWidth = 0, barClass= 'bg-indigo-400', iconClass}) {
    return (
        <div className="flex items-center justify-between space-x-3 border-b border-color p-3 last:border-none">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${iconClass}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <div>{title}</div>
                        <div className="flex items-center text-xs space-x-1">
                            <div className="text-xs font-medium">{count}</div>
                            {percent && (
                                <div className={`flex items-center ${percent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ({percent >= 0 && <FiArrowUp/>}
                                    {percent < 0 && <FiArrowDown/>}
                                    <span>{(percent < 0 ? (percent*-1) : percent)}%</span>)
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                        <div style={{width: barWidth + '%'}} className={`${barClass} h-2`}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrowserStats;
