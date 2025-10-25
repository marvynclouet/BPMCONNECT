'use client'

import React, { useEffect, useState } from 'react'

interface VinylEffectsProps {
  isScratching: boolean
  scratchIntensity: number
}

export const VinylEffects = ({ isScratching, scratchIntensity }: VinylEffectsProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; life: number }>>([])

  useEffect(() => {
    if (isScratching && scratchIntensity > 0.5) {
      // Générer des particules de scratch
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 300,
        y: Math.random() * 300,
        life: 1
      }))
      
      setParticles(prev => [...prev, ...newParticles].slice(-10)) // Limiter à 10 particules
      
      // Faire disparaître les particules
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticles[0].id))
      }, 300)
    }
  }, [isScratching, scratchIntensity])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      {/* Particules de scratch */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life
          }}
        />
      ))}
      
      {/* Effet de vibration lors du scratch */}
      {isScratching && (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(255, 255, 0, ${scratchIntensity * 0.1}) 0%, 
              transparent 70%)`,
            animation: 'scratch-glow 0.1s ease-in-out infinite alternate'
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes scratch-glow {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

// Composant pour les ondes sonores autour du vinyle
export const SoundWaves = ({ isPlaying }: { isPlaying: boolean }) => {
  if (!isPlaying) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="absolute border border-blue-400/20 rounded-full animate-pulse"
          style={{
            width: `${100 + i * 40}%`,
            height: `${100 + i * 40}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  )
}
