import React from 'react'
import { DemoSlider } from './demo-slider'
import './landing-demo.scss'

export const LandingDemo: React.FC = () => {
  return (
    <div className='custom-bg-color-primary w-full pb-12 pt-8'>
      <DemoSlider />
    </div>
  )
}
