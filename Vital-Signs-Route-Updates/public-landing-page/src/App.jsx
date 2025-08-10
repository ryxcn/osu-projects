import React from 'react'

import { Header } from './components/Header'
import { WhatWeDo, WhoWeHelp, OurTeam } from './components/Sections' 
import { Footer } from './components/Footer'

export function App() {
    return (
        <div>
            <Header/>
            <WhatWeDo/>
            <WhoWeHelp/>
            <OurTeam/>
            <Footer/>
        </div>
    )
}