'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function LogoPerfectRound({ className = "", width = 160, height = 80, priority = false }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Éviter l'hydration mismatch
  if (!mounted) {
    return (
      <div 
        className={`${className} flex items-center justify-center`}
        style={{ width, height }}
      >
        <span className="text-2xl font-bold">BPM Connect</span>
      </div>
    )
  }

  // Utiliser le logo approprié selon le thème
  // Dark mode = fond sombre = logo blanc
  // Light mode = fond clair = logo noir
  const isDark = resolvedTheme === 'dark'
  const logoSrc = isDark ? '/images/logo-light.png' : '/images/logo-dark.png'
  const altText = 'BPM Connect Logo'

  // Taille du cercle (la plus grande dimension + padding)
  const circleSize = Math.max(width, height) + 40

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: circleSize, height: circleSize }}
    >
      {/* Cercle parfait en arrière-plan */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-black shadow-2xl border border-gray-200/20 dark:border-gray-700/30"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.95) 50%, rgba(0,0,0,1) 100%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.9) 50%, rgba(243,244,246,1) 100%)'
        }}
      />
      
      {/* Logo centré */}
      <Image
        src={logoSrc}
        alt={altText}
        width={width}
        height={height}
        className="relative z-10 rounded-lg"
        priority={priority}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: width,
          maxHeight: height,
        }}
      />
    </div>
  )
}
