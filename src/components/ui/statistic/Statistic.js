import React from 'react';

function Statistic({title, count, percent, property = 'green', percentText, percentIcon, icon}) {

    const getColorClass = () => {
        const classObject = {
            green: {
                text500: 'text-green-500 dark:text-green-400',
                text800: 'text-green-800 dark:text-green-200',
                bg200: 'bg-green-200 dark:bg-green-600'
            },
            red: {
                text500: 'text-red-500 dark:text-red-400',
                text800: 'text-red-800 dark:text-red-200',
                bg200: 'bg-red-200 dark:bg-red-600'
            },
            yellow: {
                text500: 'text-yellow-500 dark:text-yellow-400',
                text800: 'text-yellow-800 dark:text-yellow-200',
                bg200: 'bg-yellow-200 dark:bg-yellow-600'
            },
            blue: {
                text500: 'text-blue-500 dark:text-blue-400',
                text800: 'text-blue-800 dark:text-blue-200',
                bg200: 'bg-blue-200 dark:bg-blue-600'
            },
            gray: {
                text500: 'text-gray-500 dark:text-gray-400',
                text800: 'text-gray-800 dark:text-gray-200',
                bg200: 'bg-gray-200 dark:bg-gray-600'
            },
            orange: {
                text500: 'text-orange-500 dark:text-orange-400',
                text800: 'text-orange-800 dark:text-orange-200',
                bg200: 'bg-orange-200 dark:bg-orange-600'
            },
            amber: {
                text500: 'text-amber-500 dark:text-amber-400',
                text800: 'text-amber-800 dark:text-amber-200',
                bg200: 'bg-amber-200 dark:bg-amber-600'
            },
            lime: {
                text500: 'text-lime-500 dark:text-lime-400',
                text800: 'text-lime-800 dark:text-lime-200',
                bg200: 'bg-lime-200 dark:bg-lime-600'
            },
            emerald: {
                text500: 'text-emerald-500 dark:text-emerald-400',
                text800: 'text-emerald-800 dark:text-emerald-200',
                bg200: 'bg-emerald-200 dark:bg-emerald-600'
            },
            cyan: {
                text500: 'text-cyan-500 dark:text-cyan-400',
                text800: 'text-cyan-800 dark:text-cyan-200',
                bg200: 'bg-cyan-200 dark:bg-cyan-600'
            },
            sky: {
                text500: 'text-sky-500 dark:text-sky-400',
                text800: 'text-sky-800 dark:text-sky-200',
                bg200: 'bg-sky-200 dark:bg-sky-600'
            },
            indigo: {
                text500: 'text-indigo-500 dark:text-indigo-400',
                text800: 'text-indigo-800 dark:text-indigo-200',
                bg200: 'bg-indigo-200 dark:bg-indigo-600'
            },
            violet: {
                text500: 'text-violet-500 dark:text-violet-400',
                text800: 'text-violet-800 dark:text-violet-200',
                bg200: 'bg-violet-200 dark:bg-violet-600'
            },
            purple: {
                text500: 'text-purple-500 dark:text-purple-400',
                text800: 'text-purple-800 dark:text-purple-200',
                bg200: 'bg-purple-200 dark:bg-purple-600'
            },
            fuchsia: {
                text500: 'text-fuchsia-500 dark:text-fuchsia-400',
                text800: 'text-fuchsia-800 dark:text-fuchsia-200',
                bg200: 'bg-fuchsia-200 dark:bg-fuchsia-600'
            },
            pink: {
                text500: 'text-pink-500 dark:text-pink-400',
                text800: 'text-pink-800 dark:text-pink-200',
                bg200: 'bg-pink-200 dark:bg-pink-600'
            },
            rose: {
                text500: 'text-rose-500 dark:text-rose-400',
                text800: 'text-rose-800 dark:text-rose-200',
                bg200: 'bg-rose-200 dark:bg-rose-600'
            }
        }

        return classObject[property] || {};
    }

    return (
        <div className="flex justify-between space-x-3 items-center bg-white dark:bg-gray-800 p-4 rounded border border-color">
            <div className="space-y-2">
                <div>{title}</div>
                <div className="text-2xl font-bold">{count}</div>
                {percent && (
                    <div className="flex items-center space-x-1 text-xs">
                    <span className={`${getColorClass().text500} text-sm`}>
                        {percentIcon}
                    </span>
                        <span className={`${getColorClass().text500}`}>{percent}%</span>
                        <span className="text-mute">{percentText}</span>
                    </div>
                )}
            </div>
            <div className="">
                <div className={`w-10 h-10 ${getColorClass().bg200} ${getColorClass().text800} flex items-center justify-center text-lg rounded-full`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default Statistic;
