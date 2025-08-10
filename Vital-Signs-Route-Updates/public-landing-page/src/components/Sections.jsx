import React from 'react'
import { css } from '@emotion/react'

import ProductScreenshot from '../../public/images/productScreenshot.png'
import AmbulanceImage from '../../public/images/ambulanceImage.png'
import TeamImage from '../../public/images/teamPhoto.jpg'

export function WhatWeDo () {
  const info = {
    title: "Our Purpose",
    description: [
      `Our application safely and securely reads vital signs from patient data, then sends it to a database where it can be accessed by hospital personnel.
        We provide an easy-to-use interface that allows providers to see, at a glance, the vital signs of a patient being transported over the entire ambulance 
        ride. Through our HIPAA-compliant app, providers can watch a patient’s vital signs change in real time, allowing them to better judge the necessary 
        treatment for the incoming patient.`,
      `Hospital and ambulance staff are already under a significant amount of pressure at their jobs; we want to create an app that will remove the need for 
        person-person communication of vital signs, allowing both sides to focus more on treating the patient. This is especially important for high-risk, 
        delicate cases, like traumatic car accidents; knowing someone’s vital signs and how they’re changing over time will make it easier for hospital providers 
        to treat the patient. For example, having more data allows them to more accurately estimate the amount of blood required for treatment.`
    ],
    image: ProductScreenshot
  }

  return (
    <div css={sectionContainer}>
      <div css={textContainer}>
        <p css={titleStyle}>{info.title}</p>
        {info.description.map((paragraph, index) => (
            <p css={descriptionStyle} key={index}>{paragraph}</p>
        ))}
      </div>
      <div css={imageContainer}>
        <img css={sectionImage} src={info.image} alt={info.title} />
      </div>
    </div>
  )
}

export function WhoWeHelp () {
  const info = {
    title: "More About the Application",
    description: [
      `Our application is one of the first of its kind, and doesn’t have any major competitors. However, there are existing 
        solutions to these problems that we hope to integrate with. Typically, ambulance staff and hospitals communicate 
        through radio, and hospital staff only receive key patient information around 5 minutes before the ambulance arrives. 
        Radio communications are valuable for communicating information that can’t be captured through vitals; however, 
        it should not be the primary form of communication for medical providers. Our goal is to blend with these systems, 
        rather than replace them entirely. 
      `,
      `Our application uses an Oracle database as its base, which connects to a device that reads vital signs which was 
        developed by the Oregon State University ECE team for this project. Our full application, repository and documentation 
        aren’t currently available for public access, as our project partner hopes to package this into a commercial product 
        eventually. However, you can view our demo here (username and password: admin): `
    ],
    image: AmbulanceImage
  }

  return (
    <div css={[sectionContainer, { backgroundColor: '#7EA2FF' }]}>
      <div css={imageContainer}>
        <img css={sectionImage} src={info.image} alt={info.title} />
      </div>
      <div css={textContainer}>
        <p css={titleStyle}>{info.title}</p>
        {info.description.map((paragraph, index) => (
            <p css={descriptionStyle} key={index}>{paragraph}</p>
        ))}
        <a 
          href="https://vital-signs-f346860168a4.herokuapp.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          css={linkStyle}
        >
          Vital Signs Route Updates Website
        </a>
      </div>
    </div>
  )
}

export function OurTeam() {
  const info = {
    title: "Our Team",
    description: [
      `Our team is made up of 4th year computer science students at Oregon State University. Lauren Twist is graduating with a focus in Web and Mobile App 
        development. Kierra Young is graduating with a focus in Human-Computer Interaction and a minor in psychology. Sarah Carricaburu is in the accelerated 
        Masters Program, focusing on User Interface Design and Psychology, and Rylie Chen is graduating with a focus in Artificial Intelligence.`,
      `Our project partners are Mike Kolesnikov and Jerry Young. Mike Koleskinov is currently getting his PhD in OHSU’s Biomedical Informatics program, 
        and is looking for ways to optimize trauma patient care. This project was inspired by his work in the medical field and his work on his dissertation. 
        Jerry Young is the COO of Strategic Business Solutions, where he oversees all day-to-day operations and provides support for strategic efforts, 
        recruiting, and account management.`,
      `Kierra: youngkie@oregonstate.edu`,
      `Lauren: twistl@oregonstate.edu`,
      `Sarah: carricas@oregonstate.edu`,
      `Rylie: chenwan@oregonstate.edu`
    ],
    image: TeamImage,
    caption: "Team Photo (left to right): Rylie Chen, Kierra Young, Sarah Carricaburu, Lauren Twist"
  };

  return (
    <div css={sectionContainer}>
      <div css={textContainer}>
        <p css={titleStyle}>{info.title}</p>
        {info.description.map((paragraph, index) => (
            <p css={descriptionStyle} key={index}>{paragraph}</p>
        ))}
      </div>
      <div css={imageContainer}>
        <div css={imageWrapper}>
          <img css={sectionImage} src={info.image} alt={info.title} />
          <p css={captionStyle}>{info.caption}</p>
        </div>
      </div>
    </div>
  )
}

const sectionContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0px;
  height: auto;
`

const textContainer = css`
  padding: 10px;
`

const titleStyle = css`
  margin: 10px;
  padding: 0px;
  font-size: 30px;
  font-weight: bold;
`

const descriptionStyle = css`
  margin: 10px;
  margin-bottom: 15px;
  padding: 0px;
  font-size: 18px;
`

const linkStyle = css`
  margin: 10px;
  padding: 0px;
  cursor: pointer; 
  color: black;
  font-size: 18px;
  text-decoration: underline;
`;

const imageContainer = css`
  text-align: center;
`

const imageWrapper = css`
  position: relative;
  display: inline-block;
`

const sectionImage = css`
  max-width: 100%;
  height: 100%;
`

const captionStyle = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  margin: 0;
  padding: 10px;
  font-size: 14px;
  text-align: center;
`