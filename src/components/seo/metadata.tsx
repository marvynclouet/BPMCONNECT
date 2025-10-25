import { Metadata } from 'next'

interface GenerateMetadataProps {
  title: string
  description: string
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
}

export function generateMetadata({
  title,
  description,
  canonical,
  image = '/og-image.jpg',
  type = 'website',
  keywords = []
}: GenerateMetadataProps): Metadata {
  const siteName = 'BPM Connect'
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bpmconnect.com'
  
  const fullTitle = title.includes(siteName) ? title : `${title} - ${siteName}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined

  const defaultKeywords = [
    'BPM Connect',
    'beatmaking',
    'production musicale',
    'marketplace musique',
    'créateurs musicaux',
    'beats',
    'mixage',
    'mastering',
    'clips vidéo',
    'direction artistique',
    'formation musicale',
    'BMP Formation',
    'collaboration musicale',
    'francophone',
    'talents émergents'
  ]

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    authors: [{ name: 'BPM Connect' }],
    creator: 'BPM Connect',
    publisher: 'BPM Connect',
    
    // Open Graph
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'fr_FR',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@bpmconnect',
      site: '@bpmconnect',
    },

    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: canonicalUrl ? {
      canonical: canonicalUrl,
    } : undefined,

    // App specific
    applicationName: siteName,
    referrer: 'origin-when-cross-origin',
    category: 'Music',
  }
}

// Predefined metadata for common pages
export const homeMetadata = generateMetadata({
  title: 'BPM Connect - La plateforme carrière des créateurs',
  description: 'L\'écosystème complet pour développer votre carrière musicale : vendez vos services, collaborez, financez vos projets et monétisez votre talent sur BPM Connect.',
  canonical: '/',
  keywords: ['plateforme musicale', 'carrière créateurs', 'écosystème musical']
})

export const servicesMetadata = generateMetadata({
  title: 'Services Créatifs - Marketplace BPM Connect',
  description: 'Découvrez des milliers de services créatifs : beats, mixage, mastering, clips vidéo, direction artistique et plus. Trouvez le créateur parfait pour votre projet.',
  canonical: '/services',
  keywords: ['services musicaux', 'marketplace créative', 'beats', 'mixage', 'mastering']
})

export const creatorsMetadata = generateMetadata({
  title: 'Créateurs Talentueux - Réseau BPM Connect',
  description: 'Découvrez et connectez-vous avec des créateurs talentueux : beatmakers, ingénieurs son, vidéastes, artistes. Trouvez votre prochain collaborateur.',
  canonical: '/creators',
  keywords: ['créateurs musicaux', 'beatmakers', 'ingénieurs son', 'vidéastes', 'collaboration']
})

export const pricingMetadata = generateMetadata({
  title: 'Tarifs et Plans - BPM Connect',
  description: 'Découvrez nos plans Free, Pro et Boss. Commencez gratuitement et évoluez selon vos besoins. Commissions réduites, outils professionnels et support prioritaire.',
  canonical: '/pricing',
  keywords: ['tarifs', 'plans', 'abonnement', 'free', 'pro', 'boss']
})

export const formationMetadata = generateMetadata({
  title: 'BMP Formation - École de Création Musicale',
  description: 'Formations professionnelles pour créateurs musicaux. Masterclasses, certification BMP et accès privilégié à BPM Connect. Apprenez des meilleurs.',
  canonical: '/bmp-formation',
  keywords: ['formation musicale', 'masterclass', 'certification', 'école musique', 'apprentissage']
})
