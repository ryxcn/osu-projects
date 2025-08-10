import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const RespirationRateChart = ({ respiratoryRateColor }) => {
    const { patientID } = useParams()
    // filter vital signs based on the patient's ID
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)
    const respirationRateChartRef = useRef(null)

    // function to format time in HH:mm:ss format
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    // effect to create and update the chart when vital signs data or color changes
    useEffect(() => {
        const respirationRateData = vitalSigns.map(sign => ({
            x: formatTime(new Date(sign.transmitTime)),
            y: sign.respirationRate,
        }))

        const respirationRateChart = new Chart(respirationRateChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: respirationRateData,
                    borderColor: respiratoryRateColor, 
                    fill: false,
                }],
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
            respirationRateChart.destroy()
        }
    }, [vitalSigns, respiratoryRateColor]) // re-run effect when vital signs data or color changes

    // render the chart element
    return (
        <canvas ref={respirationRateChartRef}></canvas>
    )
}

export default RespirationRateChart;