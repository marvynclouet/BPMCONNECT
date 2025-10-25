'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { 
  Music, Users, Briefcase, GraduationCap, MessageCircle, 
  ExternalLink, Mail, MapPin, Phone, Heart, 
  Instagram, Twitter, Youtube, MessageSquare
} from 'lucide-react'

export const Footer = () => {
  const footerSections = [
    {
      title: "Plateforme",
      links: [
        { name: "Feed Communauté", href: "/home", icon: Users },
        { name: "Services", href: "/services", icon: Briefcase },
        { name: "Créateurs", href: "/creators", icon: Music },
        { name: "Messages", href: "/messages", icon: MessageCircle },
        { name: "Tarifs", href: "/pricing", icon: Heart }
      ]
    },
    {
      title: "Formation",
      links: [
        { name: "BPM Formation", href: "/bmp-formation", icon: GraduationCap },
        { name: "Cours Production", href: "/bmp-formation?category=production", icon: Music },
        { name: "Cours Mixage", href: "/bmp-formation?category=mixing", icon: Users },
        { name: "Certifications", href: "/bmp-formation?category=certifications", icon: GraduationCap },
        { name: "Masterclass", href: "/bmp-formation?category=masterclass", icon: ExternalLink }
      ]
    },
    {
      title: "Communauté",
      links: [
        { name: "Événements", href: "/events", icon: Users },
        { name: "Blog", href: "/blog", icon: MessageSquare },
        { name: "Aide & Support", href: "/support", icon: MessageCircle },
        { name: "Partenaires", href: "/partners", icon: Briefcase },
        { name: "Devenir Ambassadeur", href: "/ambassador", icon: Heart }
      ]
    },
    {
      title: "Entreprise",
      links: [
        { name: "À Propos", href: "/about", icon: Users },
        { name: "Carrières", href: "/careers", icon: Briefcase },
        { name: "Presse", href: "/press", icon: ExternalLink },
        { name: "Contact", href: "/contact", icon: Mail },
        { name: "Mentions Légales", href: "/legal", icon: ExternalLink }
      ]
    }
  ]

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/bpmconnect_", icon: Instagram, color: "hover:text-pink-500" },
    { name: "TikTok", href: "https://tiktok.com/@bpmconnect", icon: MessageSquare, color: "hover:text-black dark:hover:text-white" },
    { name: "YouTube", href: "https://youtube.com/@bpmconnect", icon: Youtube, color: "hover:text-red-500" },
    { name: "Twitter", href: "https://twitter.com/BPMConnect_fr", icon: Twitter, color: "hover:text-blue-500" }
  ]

  return (
    <footer className="bg-gradient-to-b from-background to-gray-900/20 dark:to-black/40 border-t border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="block w-fit">
              <Logo width={200} height={100} priority />
            </Link>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                La plateforme carrière des créateurs musicaux. 
                Vendez vos services, collaborez, financez vos projets et monétisez votre talent.
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <a href="mailto:contact@bpmconnect.fr" className="hover:text-foreground transition-colors">
                    contact@bpmconnect.fr
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+33 1 23 45 67 89</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground ${social.color} transition-all duration-200 hover:scale-110`}
                      title={social.name}
                    >
                      <IconComponent size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                      >
                        <IconComponent size={14} className="group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-sm">{link.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border/50">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              15K+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Créateurs Actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Services Vendus</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              2.3M€
            </div>
            <div className="text-sm text-muted-foreground mt-1">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 BPM Connect. Tous droits réservés. 
            <span className="ml-2">Fait avec ❤️ pour la communauté musicale française</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </footer>
  )
}
