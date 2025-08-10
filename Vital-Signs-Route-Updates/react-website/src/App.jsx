import React, { useState } from 'react'
import { Outlet, useRouteError, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import { Login } from './components/login'

import StaffCredentials from './data/login_credentials.json'
import VitalSigns from './data/patient_data.json'
import profileImage from './components/images/profileImage.png'

export function Home() {
    app.get('/api/data', (req, res) => {
        connection.execute(
          `SELECT * FROM 'VITAL_SIGN'`,
          (err, result) => {
            if (err) {
              console.error(err.message);
              return;
            }
            res.send(result.rows);
          }
        );
      });
      
      fetch('/api/data')
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    return (
        <></>
    )
}

export function Root({ children }) {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const [loggedInStaff, setLoggedInStaff] = useState(null)
    const [loggedInStaffInfo, setLoggedInStaffInfo] = useState(null)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const handleLogin = (staffID) => {
        // retrieve the staff name from StaffCredentials using the staffID
        const foundStaff = StaffCredentials.find(cred => cred.staffID === staffID)
        if(foundStaff) {
            setLoggedInStaffInfo(foundStaff)
            // set authentication status to true upon successful login
            setIsLoggedIn(true)
            // set the staffID of the logged-in staff
            setLoggedInStaff(staffID)
        }
    }

    const handleLogout = () => {
        // set authentication status to false upon logout
        setIsLoggedIn(false) 
        // reset the staffID of the logged-in staff
        setLoggedInStaff(null)
        // reset the staff name of the logged-in staff
        setLoggedInStaffInfo(null)
        // reset the selected patient
        setSelectedPatient(null)
        // navigate back to the home route ("/")
        navigate("/")
    }

    return (
        <div>
            {isLoggedIn ? ( // render based on authentication status
                <>
                    <div>
                        <SideBar 
                            patients={VitalSigns.patients} 
                            loggedInStaff={loggedInStaff} 
                            loggedInStaffInfo={loggedInStaffInfo}
                            onLogout={handleLogout}
                            setSelectedPatient={setSelectedPatient}
                            selectedPatient={selectedPatient}
                        />
                    </div>
                    <div>
                        {!selectedPatient && (
                            <Landing
                                patients={VitalSigns.patients}
                                loggedInStaff={loggedInStaff}
                                loggedInStaffInfo={loggedInStaffInfo}
                            />
                        )}
                    </div>
                    <main>
                        {children || <Outlet/>}
                    </main>
                </>
            ) : (
                <Login onLogin={handleLogin} /> 
            )}
        </div>
    )
}

export function Landing({ patients, loggedInStaff, loggedInStaffInfo }) {
    let filteredPatients = patients

    if (loggedInStaffInfo.name !== 'Administrator') {
        // filter patients based on the logged-in staff's ID
        filteredPatients = patients.filter(patient => patient.doctorID === loggedInStaff)
    }

    // get the current year
    const currentYear = new Date().getFullYear()

    // filter patients based on transport time
    const currentPatients = filteredPatients.filter(patient => {
        const transportYear = new Date(patient.transportTime).getFullYear()
        return transportYear === currentYear
    })
    const previousPatients = filteredPatients.filter(patient => {
        const transportYear = new Date(patient.transportTime).getFullYear();
        return transportYear !== currentYear;
    })

    return (
        <div css={landingContainer}>
            <div css={loggedInPersonContainer}>
                <img src={profileImage} alt="Profile" css={profileImageStyle}/>
                <p css={subheadingStyle}>{loggedInStaffInfo.name}</p>
                <p css={staffInfoStyle}> 
                    <strong>Specialty: </strong> 
                    {loggedInStaffInfo.specialty}
                </p>
                <p css={staffInfoStyle}>
                    <strong>Email: </strong>
                    {loggedInStaffInfo.email}
                </p>
                <p css={staffInfoStyle}>
                    <strong>Phone: </strong>
                    {loggedInStaffInfo.phone_number}
                </p>
            </div>
            <div css={patientInfoContainer}>
                <div css={patientsBox}>
                    <p css={subheadingStyle}>Current Patients</p>
                    <div css={patientListStyles}>
                        {currentPatients.map(patient => (
                            <p
                                key={patient.patientID}
                                css={patientStyles} 
                            >
                                {patient.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div css={patientsBox}>
                    <p css={subheadingStyle}>Previous Patients</p>
                    <div css={patientListStyles}>
                        {previousPatients.map(patient => (
                            <p
                                key={patient.patientID}
                                css={patientStyles} 
                            >
                                {patient.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Header({ handleMenuToggle, selectedPatient }) {
    return (
        <div css={headerStyler}>
            <div>
                <button css={menuButtonStyles} onClick={handleMenuToggle}>
                    <span className="material-icons">menu</span> 
                </button>
            </div>
            {selectedPatient && (
                <div css={patientInfoBox}>
                    <div css={patientInfo}>
                        <p css={patientInfoText}>{selectedPatient.name} - Transport Time: {selectedPatient.transportTime}</p>
                    </div>
                    <div css={patientInfo}>
                        <p css={patientInfoTextSecondary}>Date of Birth: {selectedPatient.DOB}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export function SideBar({ patients, loggedInStaff, loggedInStaffInfo, onLogout, setSelectedPatient, selectedPatient }) {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    let filteredPatients = patients

    if (loggedInStaffInfo.name !== 'Administrator') {
        // filter patients based on the logged-in staff's ID
        filteredPatients = patients.filter(patient => patient.doctorID === loggedInStaff)
    }

    // open sidebar
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // close sidebar 
    const handleCloseMenu = () => {
        setIsMenuOpen(false)
    }

    const handleUserClick = () => {
        // reset the selected patient
        setSelectedPatient(null)
        // close sidebar 
        setIsMenuOpen(false)
        // navigate back to the home route ("/"), landing page
        navigate("/")
    }

    const handlePatientSelect = (patientID) => {
        // navigate to the selected patient's route
        navigate(`/patient/${patientID}`)
        // set the selected patient
        setSelectedPatient(patients.find(patient => patient.patientID === patientID))
        // close the menu after selecting a patient
        setIsMenuOpen(false)
    }

    return (
        <>
            <Header handleMenuToggle={handleMenuToggle} selectedPatient={selectedPatient}/>
            <div css={[sidebarStyles, isMenuOpen ? menuOpenSidebar : menuClosedSidebar]}>
                <div css={sidebarContainerStyles}>
                    <div css={closeMenuButtonContainerStyles}>
                        <button css={closeMenuButtonStyles} onClick={handleCloseMenu}>
                            <span className="material-icons">close</span> 
                        </button>
                    </div>
                    <div onClick={handleUserClick}> 
                        <p css={userStyle}>{loggedInStaffInfo.name}</p>
                    </div>
                    <div css={divider}></div>
                    <div>
                        <p css={patientHeading}>Patients</p>
                    </div>
                    <div css={patientListStyles}>
                        {filteredPatients.map(patient => (
                            <p
                                key={patient.patientID}
                                css={patientItemStyles} 
                                onClick={() => handlePatientSelect(patient.patientID)}
                            >
                                {patient.name}
                            </p>
                        ))}
                    </div>
                    <div css={divider}></div>
                    <div>
                        <button css={logoutButtonStyles} onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <>
            <p>Error: {error.statusText || error.message}</p>
        </>
    )
}

const headerStyler = css`
    display: flex;
    align-items: center;
    background-color: #4b7ed6; 
    padding: 10px; 
    margin: 0px;
    margin-bottom: 20px;
`

const landingContainer = css`
    display: flex;
    padding: 0px;
    margin: 0px;
`

const loggedInPersonContainer = css`
    background-color: #eaeaea;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 10px;
    margin: 10px;
    margin-left: 20px;
    border-radius: 5px;
`

const profileImageStyle = css`
    width: 100px; 
    height: 100px; 
    border-radius: 50%; 
    margin-bottom: 10px; 
`

const staffInfoStyle = css`
    text-align: center;
    padding: 8px 16px;
    margin: 0px;
`

const patientInfoContainer = css`
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 10px;
    margin-right: 20px;
`

const patientsBox = css`
    background-color: #eaeaea;
    border-radius: 5px;
    padding: 10px;
    margin: 0px;
    margin-bottom: 20px;
`

const subheadingStyle = css`
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    padding: 0px;
    margin: 0px;
`

const patientStyles = css`
    padding: 8px 16px;
    margin: 0px;
`

const sidebarStyles = css`
    margin: 10px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: #3d434c;
    color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 250px;
    z-index: 1000; 
    transition: transform 0.3s ease; 
`

const sidebarContainerStyles = css`
    margin: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const menuOpenSidebar = css`
    transform: translateX(0); 
`

const menuClosedSidebar = css`
    display: none;
`

const menuButtonStyles = css`
    padding: 5px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
`

const closeMenuButtonContainerStyles = css`
    align-items: right;
    align-self: flex-end; 
`

const closeMenuButtonStyles = css`
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    border: none;
    background: none;
    font-size: inherit;
    font-family: inherit;

    &:hover {
        color: #4977c5;
    }
`

const userStyle = css`
    padding: 8px 16px;
    margin: 0px;
    display: inline-block;
    cursor: pointer;

    &:hover {
        color: #4977c5;
    }
`

const patientListStyles = css`
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column; 
    align-items: center;
    overflow-y: auto;
`

const patientHeading = css`
    padding: 8px 16px;
    margin: 0px;
    display: inline-block;
    text-align: left;
`

const patientItemStyles = css`
    padding: 8px 16px;
    margin: 0px;
    cursor: pointer;

    &:hover {
        color: #4977c5;
    }
`

const logoutButtonStyles = css`
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    border: none;
    background: none;
    font-size: inherit;
    font-family: inherit;

    &:hover {
        color: #4977c5;
    }
`

const divider = css`
    width: 100%;
    border-bottom: 2px solid white; 
    margin: 0px;
`

const patientInfoBox = css` 
    padding: 5px;
    margin: 5px;
    width: 100%;
`

const patientInfo = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const patientInfoText = css`
    font-size: 30px; 
    color: white;
    margin: 0px;
`

const patientInfoTextSecondary = css`
    font-size: 20px; 
    color: white;
    margin: 0px;
`