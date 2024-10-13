'use client'
import React, { useCallback, useState } from 'react'
import Lottie from 'react-lottie-player'

import waveAnimation from '../assets/animations/wave.json'
import { PageTitle } from './PageTitle'

export const SayHello = () => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <PageTitle onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Hello there
      </PageTitle>
      <Lottie loop animationData={waveAnimation} play={isHovering} className="size-10" />
    </div>
  )
}
