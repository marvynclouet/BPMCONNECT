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
      // Créer 15 particules d'émoji
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 20, // Position X autour du clic
        y: 50 + (Math.random() - 0.5) * 20, // Position Y autour du clic
        rotation: Math.random() * 360,
        velocityY: -2 - Math.random() * 2, // Vitesse verticale (vers le haut)
        velocityX: (Math.random() - 0.5) * 3, // Vitesse horizontale aléatoire
        scale: 0.8 + Math.random() * 0.4, // Taille variable
      }))

      setParticles(newParticles)

      // Nettoyer les particules après l'animation
      const timeout = setTimeout(() => {
        setParticles([])
      }, 1500)

      return () => clearTimeout(timeout)
    }
  }, [trigger])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ height: '100vh', width: '100vw' }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-3xl select-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animation: `emojiFloat 1.5s ease-out forwards`,
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
              calc(-50% + var(--velocityY, -200px))
            ) rotate(calc(var(--rotation, 0deg) + 360deg)) scale(0.5);
          }
        }
      `}</style>
    </div>
  )
}
