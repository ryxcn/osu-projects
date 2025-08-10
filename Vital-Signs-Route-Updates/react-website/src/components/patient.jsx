import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useParams } from "react-router-dom"
import { css } from "@emotion/react";

import { Root, SideBar } from '../App'
import VitalSigns from '../data/patient_data.json'

import BloodPressureChart from './graphs/bloodPressureChart';
import HeartRateChart from './graphs/heartRateChart'
import TemperatureChart from './graphs/temperatureChart'
import RespirationRateChart from './graphs/respirationRateChart'
import BloodOxygenChart from './graphs/bloodOxygenChart'

import BloodPressureImage from './images/blood-pressure-icon.png'
import HeartRateImage from './images/heart-rate-icon.png'
import OxygenImage from './images/oxygen-icon.png'
import RespirationRateImage from './images/respiration-rate-icon.png'
import TemperatureImage from './images/temperature-icon.png'

export function Patients() {
    return (
        <SideBar patients={VitalSigns.patients}>
            <Outlet/>
        </SideBar>
    )
}

export function Patient() {
    const { patientID } = useParams();
    const patient = VitalSigns.patients.find(patient => patient.patientID === patientID)
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const [currentIndex, setCurrentIndex] = useState(0)

    // display data in 30 second intervals
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % vitalSigns.length)
        }, 30000)

        return () => clearInterval(intervalId)
    }, [vitalSigns])

    if (!patient) {
        return <div>Patient not found</div>
    }

    const currentVitalSign = vitalSigns[currentIndex]

    // medical color code based on vital signs
    const green = '#0cad49'
    const yellow = '#fdb400'
    const red = '#ed1c2e'

    // determine color based on respiratory rate
    let respiratoryRateColor
    if (currentVitalSign.respirationRate >= 12 && currentVitalSign.respirationRate <= 25) {
        respiratoryRateColor = green
    } 
    else if (
        (currentVitalSign.respirationRate >= 9 && currentVitalSign.respirationRate <= 11) ||
        (currentVitalSign.respirationRate >= 26 && currentVitalSign.respirationRate <= 29)
    ) {
        respiratoryRateColor = yellow
    } 
    else if (currentVitalSign.respirationRate <= 8 || currentVitalSign.respirationRate >= 30 ) {
        respiratoryRateColor = red
    }

    // determine color based on heart rate
    let heartRateColor
    if (currentVitalSign.heartRate >= 50 && currentVitalSign.heartRate <= 110) {
        heartRateColor = green
    }
    else if (
        (currentVitalSign.heartRate >= 41 && currentVitalSign.heartRate <= 49) || 
        (currentVitalSign.heartRate >= 111 && currentVitalSign.heartRate <= 129)
    ) {
        heartRateColor = yellow
    }
    else if (currentVitalSign.heartRate <= 40 || currentVitalSign.heartRate >= 130) {
        heartRateColor = red
    }

    // determine color based on systolic blood pressure 
    let bloodPressureColor
    if (currentVitalSign.systolicBP >= 90 && currentVitalSign.systolicBP <= 150) {
        bloodPressureColor = green
    }
    else if (
        (currentVitalSign.systolicBP >= 81 && currentVitalSign.systolicBP <= 89) || 
        (currentVitalSign.systolicBP >= 151 && currentVitalSign.systolicBP <= 179)
    ) {
        bloodPressureColor = yellow
    }
    else if (currentVitalSign.systolicBP <= 80 || currentVitalSign.systolicBP >= 180) {
        bloodPressureColor = red
    }

    // determine color based on blood oxygen 
    let bloodOxygenColor
    if (currentVitalSign.bloodOxygen >= 95) {
        bloodOxygenColor = green
    }
    else if (currentVitalSign.bloodOxygen >= 86 && currentVitalSign.bloodOxygen <= 94) {
        bloodOxygenColor = yellow
    }
    else if (currentVitalSign.bloodOxygen <= 85) {
        bloodOxygenColor = red
    }

    const transmitTime = new Date(currentVitalSign.transmitTime);
    const transmitTimeFormatted = transmitTime.toLocaleTimeString([], { hour12: false });

    return (
        <>
            <div css={transmitTimeContainer}>
                <p css={transmitTimeText}>Last Transmit: {transmitTimeFormatted}</p>
            </div>
            <div>
                <div css={vitalSignContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignContent}>
                            <p css={vitalSignName}>Blood Pressure</p>
                            <img css={image} src={BloodPressureImage} alt="blood pressure icon"/>
                        </div>
                        <div css={vitalSignContent}>
                            <p css={[vitalSignValue, { color: bloodPressureColor }]}>
                                {currentVitalSign.systolicBP}
                            </p>
                            <div css={divider}></div>
                            <p css={[vitalSignValue, { color: bloodPressureColor }]}>
                                {currentVitalSign.diastolicBP}
                            </p>
                        </div>
                    </div>
                    <div css={GraphContainer}>
                        <BloodPressureChart bloodPressureColor={bloodPressureColor} />
                    </div>
                </div>

                <div css={vitalSignContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignContent}>
                            <p css={vitalSignName}>Heart Rate</p>
                            <img css={image} src={HeartRateImage} alt="heart rate icon"/>
                        </div>
                        <div css={vitalSignContent}>
                            <p css={[vitalSignValue, { color: heartRateColor }]}>
                                {currentVitalSign.heartRate}
                            </p>
                        </div>
                    </div>
                    <div css={GraphContainer}>
                        <HeartRateChart heartRateColor={heartRateColor}/>
                    </div>
                </div>

                <div css={vitalSignContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignContent}>
                            <p css={vitalSignName}>Temperature</p>
                            <img css={image} src={TemperatureImage} alt="temperature icon"/>
                        </div>
                        <div css={vitalSignContent}>
                            <p css={[vitalSignValue, { color: 'black' }]}>
                                {currentVitalSign.temperature}
                            </p>
                        </div>
                    </div>
                    <div css={GraphContainer}>
                        <TemperatureChart/>
                    </div>
                </div>

                <div css={vitalSignContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignContent}>
                            <p css={vitalSignName}>Blood Oxygen</p>
                            <img css={image} src={OxygenImage} alt="oxygen icon"/>
                        </div>
                        <div css={vitalSignContent}>
                            <p css={[vitalSignValue, { color: bloodOxygenColor }]}>
                                {currentVitalSign.bloodOxygen}
                            </p>
                        </div>
                    </div>
                    <div css={GraphContainer}>
                        <BloodOxygenChart bloodOxygenColor={bloodOxygenColor}/>
                    </div>
                </div>

                <div css={vitalSignContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignContent}>
                            <p css={vitalSignName}>Respiration Rate</p>
                            <img css={image} src={RespirationRateImage} alt="respiration rate icon"/>
                        </div>
                        <div css={vitalSignContent}>
                            <p css={[vitalSignValue, { color: respiratoryRateColor }]}>
                                {currentVitalSign.respirationRate}
                            </p>
                        </div>
                    </div>
                    <div css={GraphContainer}>
                        <RespirationRateChart respiratoryRateColor={respiratoryRateColor}/>
                    </div>
                </div>
            </div>
        </>
    )
}

const transmitTimeContainer = css`
    position: fixed;
    bottom: 20px;
    right: 20px;
    margin: 10px;
    z-index: 9999;
`

const transmitTimeText = css`
    font-size: 20px;
    color: #333;
    margin: 0px;
`

const vitalSignContainer = css`
    display: flex;
    flex-direction: row; 
    margin: 10px;
    margin-bottom: 10px;
    align-items: start;
`

const vitalSign = css`
    display: flex;
    flex-direction: row;
    height: 250px;
    width: 300px;
    align-items: center;
    justify-content: center;
    background-color: #eaeaea;
    color: black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`

const vitalSignContent = css`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
`

const vitalSignName = css`
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin: 0px;
    padding: 0px;
`

const vitalSignValue = css`
    font-size: 40px;
    margin: 0px;
`

const divider = css`
    width: 100%;
    border-bottom: 2px solid black; 
    margin: 0px;
`

const image = css`
    padding: 10px;
`

const GraphContainer = css`
    align-items: center;
    background-color: #eaeaea;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    display: grid;
    height: 250px;
    width: 500px;
`