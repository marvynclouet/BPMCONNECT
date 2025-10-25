'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Settings,
  BarChart3,
  UserCheck,
  Ban,
  Eye,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import { MainNavbar } from '@/components/navigation/main-navbar'

// Mock data for admin dashboard
const MOCK_STATS = {
  totalUsers: 2450,
  totalOrders: 1892,
  totalRevenue: 89750,
  monthlyGrowth: 12.5,
  activeServices: 456,
  pendingPayouts: 15670,
  disputedOrders: 12,
  newSignups: 89
}

const MOCK_RECENT_USERS = [
  {
    id: '1',
    display_name: 'DJ Producer',
    email: 'djproducer@example.com',
    role: 'beatmaker',
    subscription_plan: 'pro',
    created_at: '2024-10-24T00:00:00Z',
    kyc_status: 'verified',
    total_orders: 12,
    total_revenue: 890
  },
  {
    id: '2',
    display_name: 'Alex Mix Master',
    email: 'alex@example.com',
    role: 'engineer',
    subscription_plan: 'boss',
    created_at: '2024-10-23T00:00:00Z',
    kyc_status: 'pending',
    total_orders: 34,
    total_revenue: 2340
  }
]

const MOCK_RECENT_ORDERS = [
  {
    id: '1',
    service_title: 'Beat Trap professionnel',
    buyer_name: 'Client A',
    seller_name: 'DJ Producer',
    amount: 45,
    status: 'completed',
    created_at: '2024-10-24T00:00:00Z',
    platform_fee: 4.5
  },
  {
    id: '2',
    service_title: 'Mixage professionnel',
    buyer_name: 'Client B', 
    seller_name: 'Alex Mix Master',
    amount: 80,
    status: 'in_progress',
    created_at: '2024-10-23T00:00:00Z',
    platform_fee: 4.0
  }
]

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        window.location.href = '/signin'
        return
      }

      // Check if user is admin (in real app, check user role in database)
      if (user.email !== 'admin@bpmconnect.com') {
        window.location.href = '/dashboard'
        return
      }

      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'disputed': return 'bg-red-100 text-red-800'
      case 'verified': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement du dashboard admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Administrateur 🛠️
            </h1>
            <Badge className="bg-red-600">Admin</Badge>
          </div>
          <p className="text-muted-foreground">
            Gestion et supervision de la plateforme BPM Connect
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{MOCK_STATS.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{MOCK_STATS.newSignups} nouveaux ce mois
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes Total</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{MOCK_STATS.totalOrders.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{MOCK_STATS.monthlyGrowth}% ce mois
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{MOCK_STATS.totalRevenue.toLocaleString()}€</div>
                  <p className="text-xs text-muted-foreground">
                    Commissions plateforme
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Litiges</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{MOCK_STATS.disputedOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    Nécessitent attention
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Croissance Mensuelle</CardTitle>
                  <CardDescription>Évolution des métriques clés</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mb-4" />
                    <div className="text-center">
                      <p>Graphique des données</p>
                      <p className="text-sm">(Integration Chart.js à prévoir)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions Rapides</CardTitle>
                  <CardDescription>Tâches administratives courantes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Gérer les litiges ({MOCK_STATS.disputedOrders})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Traiter les payouts ({MOCK_STATS.pendingPayouts.toLocaleString()}€)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Vérifier les KYC en attente
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Modérer le contenu
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h2>
                <p className="text-muted-foreground">Supervision et modération des comptes</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Rechercher un utilisateur..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les rôles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="creator">Créateurs</SelectItem>
                  <SelectItem value="beatmaker">Beatmakers</SelectItem>
                  <SelectItem value="engineer">Ingénieurs</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="suspended">Suspendus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs Récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_RECENT_USERS.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium text-foreground">{user.display_name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge className={user.subscription_plan === 'pro' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                            {user.subscription_plan}
                          </Badge>
                          <Badge className={getStatusColor(user.kyc_status)}>
                            {user.kyc_status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm">
                          <div className="text-foreground">{user.total_orders} commandes</div>
                          <div className="text-muted-foreground">{user.total_revenue}€ CA</div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Gestion des Commandes</h2>
                <p className="text-muted-foreground">Supervision des transactions et litiges</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Commandes Récentes</CardTitle>
                    <CardDescription>Gérer et valider les commandes</CardDescription>
                  </div>
                  <Badge variant="destructive">{MOCK_STATS.disputedOrders} litiges</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_RECENT_ORDERS.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-foreground">{order.service_title}</div>
                          {order.status === 'in_progress' && (
                            <Badge variant="outline" className="text-xs">
                              À valider
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.buyer_name} → {order.seller_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium text-foreground">{order.amount}€</div>
                          <div className="text-xs text-muted-foreground">
                            Commission: {order.platform_fee}€
                          </div>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === 'in_progress' && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs placeholder */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Paiements</CardTitle>
                <CardDescription>Payouts, remboursements et transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Interface de gestion des paiements à développer</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Modération du Contenu</h2>
                <p className="text-muted-foreground">Services en attente de validation</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Services à valider</CardTitle>
                    <CardDescription>Approuver ou rejeter les nouveaux services</CardDescription>
                  </div>
                  <Badge className="bg-yellow-500">3 en attente</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: '1', title: 'Mixage Professionnel', creator: 'DJ Producer', category: 'Mix', status: 'pending' },
                    { id: '2', title: 'Beat Custom Trap', creator: 'Alex Beats', category: 'Beat', status: 'pending' },
                    { id: '3', title: 'Clip Lyrical', creator: 'Vision Creative', category: 'Vidéo', status: 'pending' }
                  ].map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-foreground">{service.title}</div>
                          <Badge variant="outline">{service.category}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Par {service.creator}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Valider
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-2" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Signalements</CardTitle>
                    <CardDescription>Messages signalés par la communauté</CardDescription>
                  </div>
                  <Badge variant="destructive">2 signalements</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3" />
                  <p>Aucun signalement actif</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Paramètres & Logs</h2>
                <p className="text-muted-foreground">Configuration et historique d'activité</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tarification Plateforme</CardTitle>
                <CardDescription>Modifier les taux de commission par plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Plan Free</div>
                    <div className="text-sm text-muted-foreground">Commission actuelle</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">8%</div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Plan Pro</div>
                    <div className="text-sm text-muted-foreground">Commission actuelle</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">5%</div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Plan Boss</div>
                    <div className="text-sm text-muted-foreground">Commission actuelle</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">3%</div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Historique des Logs</CardTitle>
                    <CardDescription>Traçabilité des actions administratives</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Validation service', user: 'DJ Producer', admin: 'Admin', time: 'il y a 2h' },
                    { action: 'Refus KYC', user: 'User123', admin: 'Admin', time: 'il y a 5h' },
                    { action: 'Modification commission', user: 'System', admin: 'Admin', time: 'il y a 1j' }
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded text-sm">
                      <div>
                        <span className="font-medium">{log.action}</span>
                        <span className="text-muted-foreground"> - {log.user}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Par {log.admin} • {log.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Note: metadata export doesn't work in 'use client' components
// SEO will be handled by the layout or a parent server component
