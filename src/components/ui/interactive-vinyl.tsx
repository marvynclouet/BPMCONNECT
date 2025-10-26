'use client'

import React, { useState, useRef, useEffect } from 'react'
import { VinylEffects, SoundWaves } from './vinyl-effects'

interface InteractiveVinylProps {
  size?: number
  className?: string
}

export const InteractiveVinyl = ({ size = 300, className = "" }: InteractiveVinylProps) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastAngle, setLastAngle] = useState(0)
  const [scratchIntensity, setScratchIntensity] = useState(0)
  const vinylRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(Date.now())
  const lastMoveTime = useRef<number>(0)
  const lastRotation = useRef<number>(0)

  // Animation continue quand pas de drag
  useEffect(() => {
    if (isPlaying && !isDragging) {
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current
        setRotation((elapsed * 0.03) % 360) // Rotation lente
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, isDragging])

  // Calculer l'angle à partir de la position de la souris
  const getAngleFromEvent = (event: MouseEvent | React.MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const clientX = 'clientX' in event ? event.clientX : (event as any).touches[0].clientX
    const clientY = 'clientY' in event ? event.clientY : (event as any).touches[0].clientY
    
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    if (!vinylRef.current) return
    
    setIsDragging(true)
    setIsPlaying(false)
    setLastAngle(getAngleFromEvent(event, vinylRef.current))
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !vinylRef.current) return
    
    const now = Date.now()
    const currentAngle = getAngleFromEvent(event, vinylRef.current)
    const angleDiff = currentAngle - lastAngle
    
    // Gérer le passage de -180° à +180°
    let normalizedDiff = angleDiff
    if (angleDiff > 180) normalizedDiff = angleDiff - 360
    if (angleDiff < -180) normalizedDiff = angleDiff + 360
    
    const rotationChange = normalizedDiff * 2
    
    // Calculer l'intensité du scratch basée sur la vitesse
    const timeDiff = now - lastMoveTime.current
    if (timeDiff > 0) {
      const rotationSpeed = Math.abs(rotationChange) / timeDiff
      setScratchIntensity(Math.min(rotationSpeed * 50, 1)) // Normaliser entre 0 et 1
    }
    
    setRotation(prev => prev + rotationChange)
    setLastAngle(currentAngle)
    lastMoveTime.current = now
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setScratchIntensity(0) // Reset l'intensité
    setTimeout(() => {
      setIsPlaying(true)
      startTimeRef.current = Date.now() - (rotation / 0.03)
    }, 500) // Reprendre l'animation après 500ms
  }

  // Event listeners globaux
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, lastAngle])

  const vinylSize = size

  return (
    <div className={`relative select-none ${className}`} style={{ width: vinylSize, height: vinylSize }}>
      {/* Ondes sonores */}
      <SoundWaves isPlaying={isPlaying && !isDragging} />
      
      {/* Effets de scratch */}
      <VinylEffects isScratching={isDragging} scratchIntensity={scratchIntensity} />
      
      {/* Vinyle */}
      <div
        ref={vinylRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Disque principal */}
        <div 
          className="w-full h-full rounded-full bg-gray-900 dark:bg-gray-800 shadow-2xl relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at center, 
              #1a1a1a 0%, 
              #2d2d2d 20%, 
              #1a1a1a 40%, 
              #2d2d2d 60%, 
              #1a1a1a 80%, 
              #000 100%)`
          }}
        >
          {/* Sillons du vinyle */}
          {[...Array(12)].map((_, i) => {
            const radius = 20 + i * 12
            return (
              <div
                key={i}
                className="absolute border border-gray-700/30 rounded-full"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )
          })}
          
          {/* Reflets sur le vinyle */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `conic-gradient(from 0deg, 
                transparent 0deg, 
                rgba(255,255,255,0.1) 45deg, 
                transparent 90deg, 
                rgba(255,255,255,0.05) 180deg, 
                transparent 270deg)`
            }}
          />
        </div>
      </div>
      
      {/* Logo BPM au centre - Cercle blanc avec logo noir */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          transform: `rotate(${-rotation}deg)`, // Contre-rotation pour garder le logo droit
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <div 
          className="w-28 h-28 bg-white rounded-full shadow-2xl border-2 border-gray-200 flex items-center justify-center"
          style={{
            boxShadow: isDragging 
              ? '0 0 40px rgba(255,255,255,0.9), inset 0 3px 6px rgba(0,0,0,0.15)' 
              : '0 0 30px rgba(255,255,255,0.8), 0 15px 35px rgba(0,0,0,0.4), inset 0 3px 6px rgba(0,0,0,0.15)'
          }}
        >
          {/* Logo noir toujours, peu importe le thème */}
          <img
            src="/images/logo-dark.png"
            alt="BPM Connect Logo"
            className="w-20 h-10 object-contain"
          />
        </div>
      </div>
      

    </div>
  )
}

// Version plus petite pour d'autres usages
export const MiniVinyl = ({ className = "" }: { className?: string }) => {
  return <InteractiveVinyl size={150} className={className} />
}
