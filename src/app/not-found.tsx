import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full text-center">
        <CardContent className="p-12">
          <div className="text-8xl font-bold text-blue-600 mb-4">
            404
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page introuvable 🎵
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">
                Retour à l'accueil
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                Parcourir les services
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const metadata = {
  title: 'Page introuvable - BPM Connect',
  description: 'La page que vous recherchez n\'existe pas.',
}