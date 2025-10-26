'use client'

import { useEffect, useState } from 'react'
import { getMockUser, type MockUser } from '@/lib/mock-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, Music, Users, Briefcase, TrendingUp, Plus, Image, FileAudio, Sparkles, ThumbsUp, PartyPopper, Flame, Send, Video, FileText, BarChart3, Handshake, ShoppingCart } from 'lucide-react'
import { Stories } from '@/components/feed/stories'
import { CommunityStats } from '@/components/feed/community-stats'
import { Logo } from '@/components/ui/logo'
import { MainNavbar } from '@/components/navigation/main-navbar'
import { AvatarGenerator, ServicePlaceholder } from '@/components/ui/avatar-generator'
import { CommunityIllustration, EmptyStateIllustration } from '@/components/ui/illustrations'
import { getRoleIcon } from '@/components/ui/role-icons'
import { StudioAnimations, StudioVisualization } from '@/components/ui/studio-animations'
import { SocialNetworks } from '@/components/ui/social-networks'
import { BPMFormationSection } from '@/components/ui/bpm-formation-section'
import { Footer } from '@/components/ui/footer'

// Données mockées pour le feed
const MOCK_POSTS = [
  {
    id: 1,
    user: {
      name: "MC Dynamo",
      handle: "@mcdynamo",
      avatar: null,
      role: "Artiste",
      verified: true
    },
    content: "Nouveau single en studio ! 🎤 Qui serait partant pour un feat sur ce son drill ? #CollabRecherche #Drill",
    type: "collaboration",
    timestamp: "Il y a 2h",
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ["#CollabRecherche", "#Drill"],
    media: {
      type: "audio",
      preview: "Extrait - Beat Drill Lourd 🔥"
    }
  },
  {
    id: 2,
    user: {
      name: "BeatMaker Alex",
      handle: "@alexbeats",
      avatar: null,
      role: "Beatmaker",
      verified: false
    },
    content: "Pack de 20 beats trap/drill en vente ! Prix spécial communauté BPM Connect 💰",
    type: "product",
    timestamp: "Il y a 4h",
    likes: 47,
    comments: 12,
    shares: 7,
    tags: ["#BeatPack", "#Trap", "#Drill"],
    media: {
      type: "product",
      preview: "Pack 20 Beats - 49€ au lieu de 79€"
    }
  },
  {
    id: 3,
    user: {
      name: "Studio Central",
      handle: "@studiocentral",
      avatar: null,
      role: "Studio",
      verified: true
    },
    content: "Recherche ingé son expérimenté pour projet d'album. Budget 3000€. Envoyez vos démos ! 🎧",
    type: "opportunity",
    timestamp: "Il y a 6h",
    likes: 67,
    comments: 23,
    shares: 15,
    tags: ["#Job", "#IngéSon", "#Album"],
    budget: "3000€"
  },
  {
    id: 4,
    user: {
      name: "Nina Melodic",
      handle: "@ninamelodic",
      avatar: null,
      role: "Chanteuse",
      verified: false
    },
    content: "Merci à tous pour les 10K streams sur Spotify ! 🚀 Prochain objectif : 50K ! Qui me suit dans cette aventure ?",
    type: "milestone",
    timestamp: "Il y a 8h",
    likes: 89,
    comments: 34,
    shares: 12,
    tags: ["#Milestone", "#Spotify"],
    media: {
      type: "stats",
      preview: "10,247 streams ce mois"
    }
  }
]

const SUGGESTED_USERS = [
  {
    name: "DJ Fire",
    handle: "@djfire",
    role: "DJ",
    followers: "2.3K",
    mutualConnections: 5,
    avatar: null
  },
  {
    name: "Prod Mike",
    handle: "@prodmike",
    role: "Producteur",
    followers: "1.8K",
    mutualConnections: 3,
    avatar: null
  },
  {
    name: "VideoClip Pro",
    handle: "@videoclippro",
    role: "Vidéaste",
    followers: "4.1K",
    mutualConnections: 8,
    avatar: null
  }
]

const TRENDING_OPPORTUNITIES = [
  {
    title: "Recherche rappeur pour collaboration",
    budget: "500€",
    location: "Paris",
    type: "Collaboration"
  },
  {
    title: "Ingé son pour mix/master",
    budget: "200€/titre",
    location: "Remote",
    type: "Service"
  },
  {
    title: "Beatmaker pour projet commercial",
    budget: "1500€",
    location: "Lyon",
    type: "Collaboration"
  }
]

export default function HomePage() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState('')
  const [postFilter, setPostFilter] = useState<'all' | 'collaboration' | 'opportunity' | 'products'>('all')
  const [reactedPosts, setReactedPosts] = useState<Set<number>>(new Set())
  const [newPostsCount, setNewPostsCount] = useState(3)

  useEffect(() => {
    const checkAuth = () => {
      const mockUser = getMockUser()
      
      if (!mockUser || !mockUser.isAuthenticated) {
        window.location.href = '/signin'
        return
      }

      setUser(mockUser)
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de votre feed...</p>
        </div>
      </div>
    )
  }

  const handlePostSubmit = () => {
    // Simuler la publication
    console.log('Nouveau post:', newPost)
    setNewPost('')
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'collaboration': return <Users className="h-4 w-4" />
      case 'product': return <Music className="h-4 w-4" />
      case 'opportunity': return <Briefcase className="h-4 w-4" />
      case 'milestone': return <TrendingUp className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'collaboration': return 'bg-blue-100 text-blue-800'
      case 'product': return 'bg-green-100 text-green-800'
      case 'opportunity': return 'bg-purple-100 text-purple-800'
      case 'milestone': return 'bg-orange-100 text-orange-800'
      default: return 'bg-muted text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="grid lg:grid-cols-4 gap-3 sm:gap-6">
          
          {/* Sidebar gauche - Profil & Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Abonnés</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collaborations</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projets</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
                <Button className="w-full mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un post
                </Button>
              </CardContent>
            </Card>

            {/* Suggestions d'utilisateurs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggestions pour vous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {SUGGESTED_USERS.map((suggestedUser, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <AvatarGenerator 
                        name={suggestedUser.name}
                        role={suggestedUser.role.toLowerCase()}
                        size={48}
                        showRoleIcon={true}
                        showOnlineStatus={Math.random() > 0.5}
                        style="realistic"
                        className="shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm truncate text-foreground">{suggestedUser.name}</p>
                          {suggestedUser.followers.includes('K') && parseInt(suggestedUser.followers) > 2 && (
                            <div className="w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          {suggestedUser.role} • {suggestedUser.followers} abonnés
                        </p>
                        {suggestedUser.mutualConnections > 0 && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            👥 {suggestedUser.mutualConnections} connexions communes
                          </p>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors">
                        Suivre
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feed principal */}
          <div className="lg:col-span-2 order-2 lg:order-none">
            {/* Créer un post */}
            <div className="mb-6">
              <div className="flex gap-3">
                <AvatarGenerator 
                  name={user?.name || 'User'} 
                  role={user?.role || 'creator'} 
                  size={40}
                  style="realistic"
                />
                <div className="flex-1 min-w-0 border rounded-lg overflow-hidden bg-card">
                  <Textarea
                    placeholder={`Quoi de neuf, ${user?.name?.split(' ')[0]} ? Partagez une opportunité, une collaboration...`}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="resize-none border-0 px-3 py-2 focus-visible:ring-0 bg-transparent"
                    rows={3}
                  />
                  {/* Boutons d'actions à l'intérieur du champ */}
                  <div className="border-t px-3 py-2 bg-muted/30">
                    <div className="flex items-center justify-between gap-2">
                      {/* Boutons d'actions */}
                      <div className="flex items-center gap-1 flex-wrap">
                        <Button size="sm" variant="ghost" className="h-7 px-2" title="Image">
                          <Image className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2" title="Vidéo">
                          <Video className="h-4 w-4 text-purple-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2" title="Audio">
                          <FileAudio className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2" title="Offre de service">
                          <Handshake className="h-4 w-4 text-orange-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2" title="Demande">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2" title="Sondage">
                          <BarChart3 className="h-4 w-4 text-pink-500" />
                        </Button>
                      </div>
                      {/* Bouton de publication */}
                      <Button 
                        size="sm" 
                        onClick={handlePostSubmit}
                        disabled={!newPost.trim()}
                        className="h-7"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Publier
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters & New Posts Counter */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={postFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setPostFilter('all')}
                >
                  Tous
                </Button>
                <Button
                  size="sm"
                  variant={postFilter === 'collaboration' ? 'default' : 'outline'}
                  onClick={() => setPostFilter('collaboration')}
                >
                  🤝 Collaborations
                </Button>
                <Button
                  size="sm"
                  variant={postFilter === 'opportunity' ? 'default' : 'outline'}
                  onClick={() => setPostFilter('opportunity')}
                >
                  💼 Opportunités
                </Button>
                <Button
                  size="sm"
                  variant={postFilter === 'products' ? 'default' : 'outline'}
                  onClick={() => setPostFilter('products')}
                >
                  🎵 Nouveaux sons
                </Button>
              </div>

              {newPostsCount > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                  onClick={() => setNewPostsCount(0)}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {newPostsCount} nouveaux posts
                </Button>
              )}
            </div>

            {/* Stories */}
            <Stories />

            {/* Posts du feed */}
            <div className="space-y-6">
              {MOCK_POSTS.filter(post => {
                if (postFilter === 'all') return true
                if (postFilter === 'products') return post.type === 'product'
                return post.type === postFilter
              }).map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <AvatarGenerator 
                        name={post.user.name} 
                        role={post.user.role.toLowerCase()} 
                        size={44}
                        showRoleIcon={true}
                        showOnlineStatus={true}
                        style="realistic"
                        className="shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm text-foreground">{post.user.name}</h4>
                          {post.user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          <span className="text-xs text-muted-foreground font-medium">{post.user.handle}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs border-0 px-2 py-1 ${getPostTypeColor(post.type)} flex items-center gap-1`}
                          >
                            {getPostIcon(post.type)}
                            <span className="capitalize font-medium">{post.type}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm mb-3">{post.content}</p>
                    
                    {post.media && (
                      <div className="bg-muted/30 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium text-foreground">
                          {post.media.preview}
                        </p>
                      </div>
                    )}

                    {post.budget && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium text-green-800">
                          💰 Budget: {post.budget}
                        </p>
                      </div>
                    )}

                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t">
                      {/* Reactions */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-950 ${reactedPosts.has(post.id) ? 'text-red-600 dark:text-red-400' : ''}`}
                            onClick={() => {
                              const newReacted = new Set(reactedPosts)
                              if (newReacted.has(post.id)) {
                                newReacted.delete(post.id)
                              } else {
                                newReacted.add(post.id)
                              }
                              setReactedPosts(newReacted)
                            }}
                          >
                            👍
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-orange-50 dark:hover:bg-orange-950">
                            ❤️
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-purple-50 dark:hover:bg-purple-950">
                            🔥
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-yellow-50 dark:hover:bg-yellow-950">
                            👏
                          </Button>
                          {reactedPosts.has(post.id) && (
                            <span className="text-xs text-muted-foreground ml-2">+{post.likes}</span>
                          )}
                        </div>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-blue-600">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-green-600">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                      
                      {post.type === 'opportunity' || post.type === 'collaboration' ? (
                        <Button size="sm">Postuler</Button>
                      ) : post.type === 'product' ? (
                        <Button size="sm" variant="outline">Voir l'offre</Button>
                      ) : (
                        <Button size="sm" variant="ghost">Contacter</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar droite - Stats Communauté & Opportunités */}
          <div className="lg:col-span-1 order-1 lg:order-none">
            <CommunityStats />
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">🔥 Opportunités tendances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TRENDING_OPPORTUNITIES.map((opportunity, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-3">
                      <h4 className="font-medium text-sm">{opportunity.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{opportunity.type}</Badge>
                        <span className="text-xs text-muted-foreground">{opportunity.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-green-600 mt-1">{opportunity.budget}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Voir toutes les opportunités
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🏷️ Hashtags populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#DrillParis</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#CollabRecherche</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#BeatMaking</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#StudioTime</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#MixMaster</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#RapFr</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#Trap</Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">#Afrobeat</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section Animations Studio */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              🎬 Studios & Créations en Action
            </h2>
            <p className="text-muted-foreground">Découvrez l'univers créatif de nos studios partenaires</p>
          </div>
          
          <StudioAnimations />
          <StudioVisualization />
        </div>

        {/* Section BPM Formation */}
        <div className="mt-16">
          <BPMFormationSection />
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="mt-16">
          <SocialNetworks />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating "Publier" Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          size="lg" 
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => {
            document.querySelector('textarea')?.focus()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
