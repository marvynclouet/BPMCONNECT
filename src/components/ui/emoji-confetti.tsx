'use client'

import { useEffect, useState } from 'react'

interface EmojiConfettiProps {
  emoji: string
  trigger: number
}

export function EmojiConfetti({ emoji, trigger }: EmojiConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; rotation: number; velocityY: number; velocityX: number; scale: number }>>([])

  useEffect(() => {
    if (trigger > 0) {
      // Créer 20 particules d'émoji pour couvrir tout l'écran
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80, // Position X sur tout l'écran
        y: 10 + Math.random() * 80, // Position Y sur tout l'écran
        rotation: Math.random() * 720, // Rotation plus importante
        velocityY: -3 - Math.random() * 4, // Vitesse verticale plus rapide
        velocityX: (Math.random() - 0.5) * 8, // Vitesse horizontale plus large
        scale: 1.5 + Math.random() * 1, // Émojis plus gros (1.5x à 2.5x)
      }))

      setParticles(newParticles)

      // Nettoyer les particules après l'animation
      const timeout = setTimeout(() => {
        setParticles([])
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [trigger])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ height: '100vh', width: '100vw' }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-6xl select-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animation: `emojiFloat 2s ease-out forwards`,
          }}
        >
          {emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes emojiFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(var(--scale, 1));
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + var(--velocityX, 0px)),
              calc(-50% + var(--velocityY, -400px))
            ) rotate(calc(var(--rotation, 0deg) + 720deg)) scale(0.3);
          }
        }
      `}</style>
    </div>
  )
}
