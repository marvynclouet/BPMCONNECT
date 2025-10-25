'use client'

import React, { useState, useEffect } from 'react'
import { Mic, Headphones, Camera, Music, Radio, Volume2 } from 'lucide-react'

export const StudioAnimations = () => {
  const [activeAnimation, setActiveAnimation] = useState(0)
  
  const animations = [
    { icon: Mic, label: "Enregistrement", color: "text-red-500" },
    { icon: Headphones, label: "Mixage", color: "text-blue-500" },
    { icon: Camera, label: "Clip Vidéo", color: "text-purple-500" },
    { icon: Music, label: "Production", color: "text-green-500" },
    { icon: Radio, label: "Live Stream", color: "text-yellow-500" },
    { icon: Volume2, label: "Mastering", color: "text-pink-500" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnimation(prev => (prev + 1) % animations.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [animations.length])

  return (
    <div className="flex flex-wrap justify-center gap-6 my-8">
      {animations.map((animation, index) => {
        const IconComponent = animation.icon
        const isActive = index === activeAnimation
        
        return (
          <div
            key={index}
            className={`flex flex-col items-center p-4 rounded-xl transition-all duration-500 ${
              isActive 
                ? 'scale-110 bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl' 
                : 'scale-95 opacity-70 hover:scale-100 hover:opacity-100'
            }`}
          >
            <div className={`p-3 rounded-full ${animation.color} ${isActive ? 'animate-pulse' : ''}`}>
              <IconComponent 
                size={isActive ? 32 : 24} 
                className={`transition-all duration-300 ${isActive ? 'animate-bounce' : ''}`}
              />
            </div>
            <span className={`text-sm mt-2 font-medium transition-all duration-300 ${
              isActive ? 'text-white' : 'text-muted-foreground'
            }`}>
              {animation.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export const StudioVisualization = () => {
  const [waveformActive, setWaveformActive] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveformActive(prev => !prev)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-32 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10">
      {/* Waveform Animation */}
      <div className="flex items-end justify-center h-full px-4 gap-1">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className={`bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
              waveformActive ? 'animate-pulse' : ''
            }`}
            style={{
              width: '4px',
              height: waveformActive 
                ? `${Math.random() * 80 + 20}%` 
                : `${Math.sin(i * 0.3) * 30 + 40}%`,
              animationDelay: `${i * 50}ms`
            }}
          />
        ))}
      </div>
      
      {/* Studio Status */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs text-white/80 font-medium">Studio Live</span>
      </div>
      
      {/* BPM Counter */}
      <div className="absolute top-4 right-4 text-white/80 text-sm font-mono">
        140 BPM
      </div>
    </div>
  )
}
