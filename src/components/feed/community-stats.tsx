'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Music, Briefcase, MessageSquare, Heart } from 'lucide-react'

export function CommunityStats() {
  const stats = [
    {
      label: "Créateurs actifs",
      value: "2,847",
      change: "+127 cette semaine",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    {
      label: "Collaborations créées",
      value: "156",
      change: "+23 aujourd'hui",
      trend: "up",
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      label: "Projets en cours",
      value: "89",
      change: "+12 cette semaine",
      trend: "up",
      icon: <Music className="h-4 w-4" />
    },
    {
      label: "Opportunités ouvertes",
      value: "234",
      change: "+45 aujourd'hui",
      trend: "up",
      icon: <Briefcase className="h-4 w-4" />
    }
  ]

  const liveActivity = [
    {
      user: "MC Dynamo",
      action: "a publié un nouveau beat",
      time: "Il y a 2min"
    },
    {
      user: "Studio Central",
      action: "recherche un ingé son",
      time: "Il y a 5min"
    },
    {
      user: "Nina Melodic",
      action: "a commencé une collaboration",
      time: "Il y a 8min"
    },
    {
      user: "BeatMaker Alex",
      action: "a mis en ligne un pack",
      time: "Il y a 12min"
    }
  ]

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Stats Communauté
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-blue-600">{stat.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs text-green-600 bg-green-50">
                  {stat.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Activité en direct
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveActivity.map((activity, index) => (
              <div key={index} className="text-sm">
                <p>
                  <span className="font-medium text-blue-600">{activity.user}</span>
                  <span className="text-gray-700"> {activity.action}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
