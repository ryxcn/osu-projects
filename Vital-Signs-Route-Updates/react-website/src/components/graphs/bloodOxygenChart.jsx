import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const BloodOxygenChart = ({ bloodOxygenColor }) => {
    const { patientID } = useParams()
    // filter vital signs based on the patient's ID
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)
    const bloodOxygenChartRef = useRef(null)

    // function to format time in HH:mm:ss format
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    // effect to create and update the chart when vital signs data or color changes
    useEffect(() => {
        const bloodOxygenData = vitalSigns.map(sign => ({
            x: formatTime(new Date(sign.transmitTime)),
            y: sign.bloodOxygen,
        }))

        const bloodOxygenChart = new Chart(bloodOxygenChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: bloodOxygenData,
                    borderColor: bloodOxygenColor, 
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
            bloodOxygenChart.destroy()
        }
    }, [vitalSigns, bloodOxygenColor]) // re-run effect when vital signs data or color changes

    // render the chart element
    return (
        <canvas ref={bloodOxygenChartRef}></canvas>
    )
}

export default BloodOxygenChart;