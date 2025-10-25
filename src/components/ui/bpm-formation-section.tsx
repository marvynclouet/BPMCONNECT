'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { GraduationCap, Play, Star, Users, Clock, Award, TrendingUp, BookOpen } from 'lucide-react'

export const BPMFormationSection = () => {
  const [currentCourse, setCurrentCourse] = useState(0)
  
  const featuredCourses = [
    {
      title: "Production Trap Moderne",
      instructor: "DJ Fire",
      level: "Intermédiaire",
      duration: "8h30",
      students: 1247,
      rating: 4.9,
      price: "149€",
      originalPrice: "199€",
      thumbnail: "🎹",
      description: "Maîtrisez la production trap de A à Z",
      discount: "25%"
    },
    {
      title: "Mixage & Mastering Pro",
      instructor: "Alex Engineer",
      level: "Avancé",
      duration: "12h15",
      students: 892,
      rating: 4.8,
      price: "249€",
      originalPrice: "349€",
      thumbnail: "🎧",
      description: "Techniques professionnelles de studio",
      discount: "30%"
    },
    {
      title: "Création de Beats Drill",
      instructor: "BeatMaker Max",
      level: "Débutant",
      duration: "6h45",
      students: 2156,
      rating: 4.7,
      price: "99€",
      originalPrice: "139€",
      thumbnail: "🥁",
      description: "De débutant à expert en drill",
      discount: "29%"
    }
  ]

  const stats = [
    { label: "Étudiants Formés", value: "15K+", icon: Users },
    { label: "Heures de Contenu", value: "500+", icon: Clock },
    { label: "Certifications", value: "3K+", icon: Award },
    { label: "Taux de Réussite", value: "94%", icon: TrendingUp }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourse(prev => (prev + 1) % featuredCourses.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredCourses.length])

  return (
    <Card className="bg-gradient-to-br from-orange-900/20 via-background to-yellow-900/20 border-orange-500/20 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                BPM Formation
              </CardTitle>
              <p className="text-muted-foreground">Développez vos compétences musicales</p>
            </div>
          </div>
          <Link href="/bmp-formation">
            <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold">
              <BookOpen size={16} className="mr-2" />
              Voir Tous Les Cours
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={stat.label} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <IconComponent size={24} className="mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Cours Vedette */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Star className="text-yellow-500" size={20} />
            Cours à la Une
          </h3>
          
          <div className="relative">
            {featuredCourses.map((course, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentCourse 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 absolute inset-0 transform translate-x-full'
                }`}
              >
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl p-6 border border-orange-500/20">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-4xl">
                      {course.thumbnail}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-foreground">{course.title}</h4>
                          <p className="text-muted-foreground">par {course.instructor}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                          -{course.discount}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{course.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                          {course.level}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock size={14} />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users size={14} />
                          {course.students.toLocaleString()} étudiants
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          {course.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-orange-500">{course.price}</span>
                          <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                        </div>
                        <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                          <Play size={16} className="mr-2" />
                          Commencer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicateurs */}
          <div className="flex justify-center gap-2">
            {featuredCourses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCourse(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCourse 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-orange-500/30 hover:bg-orange-500/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-6 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded-xl border border-orange-500/20">
          <h3 className="text-lg font-semibold mb-2">🎓 Obtenez votre Certification BPM</h3>
          <p className="text-muted-foreground mb-4">
            Rejoignez plus de 15,000 créateurs qui ont déjà développé leurs compétences
          </p>
          <Link href="/bmp-formation">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold">
              Découvrir BPM Formation
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
