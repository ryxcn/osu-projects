import React from 'react'
import { css } from '@emotion/react'

export function Footer () {
  const emailAddress = "mike.kolesnikov@gmail.com"

  return (
    <div css={footerContainer}>
      <a href={`mailto:${emailAddress}`} css={footerButton}>Contact Mike to Learn More</a>
    </div>
  )
}

const footerContainer = css`
  background-color: black;
  padding: 40px;
  text-align: center;
`

const footerButton = css`
  background-color: #7EA2FF;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
`