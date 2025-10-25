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

export function Logo({ className = "", width = 200, height = 100, priority = false }: LogoProps) {
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
  // Dark mode = fond sombre = logo blanc (logo-light.png)
  // Light mode = fond clair = logo noir (logo-dark.png)
  const isDark = resolvedTheme === 'dark'
  const logoSrc = isDark ? '/images/logo-light.png' : '/images/logo-dark.png'
  const altText = 'BPM Connect Logo'

  return (
    <div className={`${className} flex items-center justify-center`}>
      <Image
        src={logoSrc}
        alt={altText}
        width={width}
        height={height}
        className="object-contain"
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

export function LogoMini({ className = "" }: { className?: string }) {
  return <Logo className={className} width={160} height={80} />
}

export function LogoLarge({ className = "" }: { className?: string }) {
  return <Logo className={className} width={350} height={175} priority />
}
