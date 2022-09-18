import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import {useAppState} from "store/module/app.store";

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    zoomPlugin
);

function Chart({
                   children,
                   title = '',
                   titlePosition = 'top',
                   zoom = false,
                   labelDisplay = true
}) {

    const {theme} = useAppState();
    const colors = {
        dark: {
            textPrimary: '#fff',
            linePrimary: '#374151'
        },
        light: {
            textPrimary: '#6b757d',
            linePrimary: '#f0f0f0'
        }
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: titlePosition,
                display: labelDisplay,
                labels: {
                    color: theme === 'dark' ? colors.dark.textPrimary : colors.light.textPrimary
                }
            },
            title: {
                display: title,
                text: title,
                color: theme === 'dark' ? colors.dark.textPrimary : colors.light.textPrimary
            },
            zoom: {
                pan: {
                    enabled: zoom,
                    speed: 1
                },
                zoom: {
                    wheel: {
                        enabled: zoom
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: theme === 'dark' ? colors.dark.linePrimary : colors.light.linePrimary,
                },
                ticks: {
                    color: theme === 'dark' ? colors.dark.textPrimary : colors.light.textPrimary
                }
            },
            y: {
                grid: {
                    color: theme === 'dark' ? colors.dark.linePrimary : colors.light.linePrimary
                },
                ticks: {
                    color: theme === 'dark' ? colors.dark.textPrimary : colors.light.textPrimary
                }
            }
        }
    };

    return (
        <>
            {children(options)}
        </>
    );
}

export default Chart;
