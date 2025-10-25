import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MainNavbar } from '@/components/navigation/main-navbar'
import { GraduationCap, Award, Users, PlayCircle, Clock, Star, ChevronRight, BookOpen, Video, Headphones } from 'lucide-react'

export default function BMPFormationPage() {
  const masterclasses = [
    {
      id: '1',
      title: 'Production Musicale Avancée',
      instructor: 'DJ Producer',
      duration: '2h 30min',
      students: 1240,
      rating: 4.9,
      price: 49,
      discount: 20,
      category: 'Production',
      level: 'Intermédiaire',
      preview_url: '',
      thumbnail: ''
    },
    {
      id: '2',
      title: 'Techniques de Mixage Professionnel',
      instructor: 'Alex Mix Master',
      duration: '3h 15min',
      students: 890,
      rating: 4.8,
      price: 69,
      discount: 20,
      category: 'Mixage',
      level: 'Avancé',
      preview_url: '',
      thumbnail: ''
    },
    {
      id: '3',
      title: 'Réalisation de Clips : De l\'Idée au Rendu',
      instructor: 'Creative Vision',
      duration: '4h 00min',
      students: 567,
      rating: 4.7,
      price: 89,
      discount: 20,
      category: 'Vidéo',
      level: 'Débutant',
      preview_url: '',
      thumbnail: ''
    }
  ]

  const certifiedCreators = [
    {
      id: '1',
      name: 'DJ Producer',
      role: 'Beatmaker Pro',
      avatar: '',
      specialties: ['Trap', 'Afrobeat', 'R&B'],
      orders: 127,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Alex Mix Master',
      role: 'Ingénieur Son',
      avatar: '',
      specialties: ['Mixage', 'Mastering', 'Post-production'],
      orders: 234,
      rating: 4.9
    },
    {
      id: '3',
      name: 'Creative Vision',
      role: 'Vidéaste',
      avatar: '',
      specialties: ['Clips', 'Motion Design', 'Montage'],
      orders: 89,
      rating: 4.7
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <GraduationCap className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            BMP Formation 🎓
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            L'école qui forme les futurs talents de l'industrie musicale francophone. 
            Apprenez auprès des meilleurs créateurs de BPM Connect et obtenez votre certification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="#masterclasses">
                Découvrir les formations
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#certification">
                Programme de certification
              </Link>
            </Button>
          </div>
        </div>

        {/* Your Certifications Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🎓 Vos certifications</h2>
                  <p className="opacity-90">Voir vos certifications BPM Formation</p>
                </div>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/profile/certifications">
                    Voir tout
                  </Link>
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Mock certifications */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-white/20 text-white border-none">
                      🎵 Production
                    </Badge>
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Production Musicale Avancée</h3>
                  <p className="text-sm opacity-80">Obtenue le 15 mars 2024</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="bg-white/20 px-2 py-1 rounded text-xs">Certifiée</div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-white/20 text-white border-none">
                      🎧 Mixage
                    </Badge>
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Techniques de Mixage</h3>
                  <p className="text-sm opacity-80">Obtenue le 10 février 2024</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="bg-white/20 px-2 py-1 rounded text-xs">Certifiée</div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur border-2 border-white/30 border-dashed">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="border-white/30 text-white">
                      📹 Vidéo
                    </Badge>
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Réalisation de Clips</h3>
                  <p className="text-sm opacity-80">En cours (60% complété)</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="bg-white/20 px-2 py-1 rounded text-xs">En formation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 bg-card">
            <div className="text-3xl font-bold text-orange-600 mb-2">2,500+</div>
            <div className="text-muted-foreground">Étudiants formés</div>
          </Card>
          <Card className="text-center p-6 bg-card">
            <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-muted-foreground">Cours disponibles</div>
          </Card>
          <Card className="text-center p-6 bg-card">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-muted-foreground">Taux de satisfaction</div>
          </Card>
          <Card className="text-center p-6 bg-card">
            <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
            <div className="text-muted-foreground">Créateurs certifiés</div>
          </Card>
        </div>

        {/* BPM Connect Integration */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-8 text-center">
              <Award className="h-16 w-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-4">
                De la Formation à la Réussite
              </h2>
              <p className="text-xl mb-6 opacity-90">
                BMP Formation + BMP Connect = L'écosystème complet pour développer votre carrière musicale
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold mb-2">1. Apprenez</h3>
                  <p className="text-sm opacity-80">Formations avec les meilleurs créateurs</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold mb-2">2. Certifiez-vous</h3>
                  <p className="text-sm opacity-80">Obtenez le badge BMP Certified</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold mb-2">3. Monétisez</h3>
                  <p className="text-sm opacity-80">Vendez vos services sur BMP Connect</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Masterclasses Section */}
        <section id="masterclasses" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Masterclasses Exclusives
              </h2>
              <p className="text-gray-600">
                Formations premium animées par les créateurs BPM Connect
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/bmp-formation/masterclasses">
                Voir toutes les formations
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {masterclasses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center relative">
                    <PlayCircle className="h-16 w-16 text-orange-600" />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white">
                        -{course.discount}% BMP Connect
                      </Badge>
                    </div>
                    
                    {/* Level Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Par {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} étudiants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          {Math.round(course.price * (1 - course.discount / 100))}€
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {course.price}€
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Réduction BMP Connect
                      </div>
                    </div>
                    <Button size="sm">
                      S'inscrire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certification Program */}
        <section id="certification" className="mb-16">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Programme de Certification BMP
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Obtenez la reconnaissance officielle de vos compétences et démarquez-vous sur BMP Connect
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Formation</h3>
                    <p className="text-gray-600 text-sm">
                      Suivez les modules de formation dans votre spécialité
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                    <Video className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Évaluation</h3>
                    <p className="text-gray-600 text-sm">
                      Réalisez un projet pratique évalué par nos experts
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                    <Award className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Certification</h3>
                    <p className="text-gray-600 text-sm">
                      Recevez votre badge BMP Certified et vos avantages
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Commencer ma certification
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Certified Creators */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Créateurs BMP Certified
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les créateurs qui ont obtenu la certification BMP Formation et proposent leurs services sur BMP Connect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {certifiedCreators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback className="text-xl">
                      {creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{creator.name}</h3>
                    <Award className="h-5 w-5 text-orange-600" />
                  </div>
                  
                  <p className="text-gray-600 mb-4">{creator.role}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {creator.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{creator.rating}</span>
                    </div>
                    <div>
                      {creator.orders} commandes
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/creators/${creator.name.toLowerCase().replace(' ', '')}`}>
                      Voir le profil
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/creators?certified=true">
                Voir tous les créateurs certifiés
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à développer vos compétences ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez BMP Formation et donnez un coup d'accélérateur à votre carrière musicale
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Découvrir les formations
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  Contacter un conseiller
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export const metadata = {
  title: 'BMP Formation - BPM Connect',
  description: 'Formations professionnelles pour les créateurs musicaux. Apprenez, certifiez-vous, monétisez.',
}
