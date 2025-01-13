import React from 'react'
import './scroll-down-arrow.scss'

/**
 * Scroll down component
 */
export const ScrollDownArrow : React.FC = () => {
  return (
    <>
      <div className="scroll-down-arrow">
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </div>
    </>
  )
  
}