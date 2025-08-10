import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';

import VitalSigns from '../../data/patient_data.json';

const BloodPressureChart = ({ bloodPressureColor }) => {
    const { patientID } = useParams();
    // filter vital signs based on the patient's ID
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID);
    const chartRef = useRef(null);

    // function to format time in HH:mm:ss format
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    // effect to create and update the chart when vital signs data or color changes
    useEffect(() => {
        const bloodPressureData = vitalSigns.map(sign => ({
            x: formatTime(new Date(sign.transmitTime)),
            y1: sign.systolicBP,
            y2: sign.diastolicBP
        }))

        const bloodPressureChart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Systolic BP',
                        data: bloodPressureData.map(data => ({ x: data.x, y: data.y1 })),
                        borderColor: bloodPressureColor,
                        fill: false,
                    },
                    {
                        label: 'Diastolic BP',
                        data: bloodPressureData.map(data => ({ x: data.x, y: data.y2 })),
                        borderColor: bloodPressureColor,
                        fill: false,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'black',
                        },
                        grid: {
                            color: 'grey',
                            display: true,
                        },
                    },
                    y: {
                        ticks: {
                            color: 'black',
                        },
                        grid: {
                            color: 'grey',
                            display: true,
                        },
                    },
                },
            },
        })

        // cleanup function to destroy the chart when component unmounts
        return () => {
            bloodPressureChart.destroy()
        }
    }, [vitalSigns, bloodPressureColor]) // re-run effect when vital signs data or color changes

    // render the chart element
    return (
        <canvas ref={chartRef}></canvas>
    )
}

export default BloodPressureChart;