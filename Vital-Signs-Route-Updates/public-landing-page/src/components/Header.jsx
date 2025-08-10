import React from 'react'
import { css } from '@emotion/react'

import HeaderImage from '../../public/images/headerImage.png'

export function Header() {
    return (
        <header css={headerStyle}>
          <div css={overlayStyle}>
            <p css={headerTitle}>Vital Signs En Route Transport</p>
            <p css={subheadingTitle}>Making ambulance communication easier, safer, and more consistent.</p>
            <a href="https://vital-signs-f346860168a4.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <button css={headerButton}>View Our Work</button>
            </a>
          </div>
        </header>
    )
}

const headerStyle = css`
    position: relative;
    background: url(${HeaderImage}) no-repeat center center;
    background-size: cover;
    margin-bottom: 15px;
    padding: 50px;
    text-align: center;
    color: white;
`

const overlayStyle = css`
    padding: 20px;
`

const headerTitle = css`
    margin: 20px;
    font-size: 60px;
    font-weight: bold;
`

const subheadingTitle = css`
    margin: 20px;
    font-size: 20px;
`

const headerButton = css`
    background-color: #7EA2FF;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    color: black;
    font-size: 15px;
    font-weight: bold;
`