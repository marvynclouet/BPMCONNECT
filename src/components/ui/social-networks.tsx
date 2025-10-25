'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Heart, MessageCircle, Share } from 'lucide-react'

export const SocialNetworks = () => {
  const socialPlatforms = [
    {
      name: "Instagram",
      handle: "@bpmconnect_",
      followers: "12.5K",
      engagement: "+15%",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      icon: "📸",
      url: "https://instagram.com/bpmconnect_"
    },
    {
      name: "TikTok", 
      handle: "@bpmconnect",
      followers: "45.2K",
      engagement: "+32%",
      color: "bg-gradient-to-br from-black to-red-500",
      icon: "🎵",
      url: "https://tiktok.com/@bpmconnect"
    },
    {
      name: "YouTube",
      handle: "BPM Connect",
      followers: "8.7K",
      engagement: "+8%", 
      color: "bg-gradient-to-br from-red-500 to-red-600",
      icon: "🎬",
      url: "https://youtube.com/@bpmconnect"
    },
    {
      name: "Twitter",
      handle: "@BPMConnect_fr",
      followers: "3.1K",
      engagement: "+22%",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      icon: "🐦",
      url: "https://twitter.com/BPMConnect_fr"
    }
  ]

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 via-background to-gray-900/30 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <Share size={16} className="text-white" />
          </div>
          Suivez BPM Connect
        </CardTitle>
        <p className="text-muted-foreground">Rejoignez notre communauté sur les réseaux sociaux</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.name}
              className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${platform.color.replace('bg-gradient-to-br ', '').replace('from-', '').replace(' to-', ', ').replace('-', ' ')})`,
                opacity: 0.9
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <h4 className="font-bold text-white text-lg">{platform.name}</h4>
                      <p className="text-white/80 text-sm">{platform.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">{platform.followers}</div>
                    <div className="text-green-300 text-sm font-medium">{platform.engagement}</div>
                  </div>
                </div>
                
                <Button 
                  asChild
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white font-medium transition-all duration-200"
                >
                  <a href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Users size={16} />
                    Suivre
                    <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
              
              {/* Animation d'arrière-plan */}
              <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </div>
          ))}
        </div>
        
        {/* Stats globaux */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-white/10">
          <div className="flex justify-between items-center text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">69K+</div>
              <div className="text-muted-foreground">Followers Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2.3M</div>
              <div className="text-muted-foreground">Vues Mensuelles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">18%</div>
              <div className="text-muted-foreground">Engagement Moyen</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
