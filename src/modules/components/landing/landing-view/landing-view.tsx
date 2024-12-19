import React from 'react'

import { LandingHome } from '../landing-home'
import { LandingDemo } from '../landing-demo'
import { LandingFooter } from '../landing-footer'

export const LandingView: React.FC = () => {
  return (
    <div className='w-full flex flex-nowrap flex-col '>
      <LandingHome />
      <LandingDemo />
      {/* <LandingFooter /> */}
    </div>
  )
}
