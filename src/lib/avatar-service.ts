/**
 * Service pour générer des avatars de profil réalistes
 * Utilise plusieurs APIs pour des photos de profil variées
 */

export interface AvatarOptions {
  name: string
  size?: number
  style?: 'realistic' | 'cartoon' | 'abstract' | 'initials'
  seed?: string
}

export class AvatarService {
  
  /**
   * Génère un avatar réaliste en utilisant DiceBear API
   */
  static getDiceBearAvatar(name: string, style: string = 'avataaars', size: number = 128): string {
    const seed = name.toLowerCase().replace(/\s+/g, '')
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=${size}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
  }

  /**
   * Génère un avatar avec UI Avatars (style texte)
   */
  static getUIAvatar(name: string, size: number = 128): string {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    const colors = [
      'FF6B6B', '4ECDC4', '45B7D1', 'F7DC6F', 'BB8FCE', 
      'F8C471', '85C1E9', '82E0AA', 'F1C40F', 'E74C3C'
    ]
    const color = colors[name.length % colors.length]
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=${color}&color=fff&bold=true&format=svg`
  }

  /**
   * Génère un avatar moderne avec RoboHash
   */
  static getRoboHashAvatar(name: string, size: number = 128): string {
    const seed = name.toLowerCase().replace(/\s+/g, '')
    return `https://robohash.org/${encodeURIComponent(seed)}.svg?size=${size}x${size}&set=set4`
  }

  /**
   * Génère un avatar réaliste avec Multiavatar
   */
  static getMultiAvatar(name: string, size: number = 128): string {
    const seed = name.toLowerCase().replace(/\s+/g, '')
    return `https://api.multiavatar.com/${encodeURIComponent(seed)}.svg?size=${size}`
  }

  /**
   * Avatar principal - mélange de styles pour plus de variété
   */
  static getAvatar({ name, size = 128, style = 'realistic', seed }: AvatarOptions): string {
    const actualSeed = seed || name
    const nameHash = actualSeed.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    switch (style) {
      case 'realistic':
        // Alterner entre différentes APIs pour plus de variété
        const styleIndex = Math.abs(nameHash) % 4
        switch (styleIndex) {
          case 0: return this.getDiceBearAvatar(actualSeed, 'personas', size)
          case 1: return this.getDiceBearAvatar(actualSeed, 'avataaars', size)
          case 2: return this.getMultiAvatar(actualSeed, size)
          default: return this.getDiceBearAvatar(actualSeed, 'lorelei', size)
        }

      case 'cartoon':
        return this.getDiceBearAvatar(actualSeed, 'bottts', size)
        
      case 'abstract':
        return this.getDiceBearAvatar(actualSeed, 'shapes', size)
        
      case 'initials':
      default:
        return this.getUIAvatar(actualSeed, size)
    }
  }

  /**
   * Avatar spécialisé par rôle musical
   */
  static getMusicRoleAvatar(name: string, role: string, size: number = 128): string {
    const roleStyles = {
      'beatmaker': 'personas', // Style réaliste pour producteurs
      'rapper': 'avataaars',    // Style cartoon pour rappeurs
      'singer': 'lorelei',      // Style féminin/masculin
      'dj': 'bottts',           // Style techno pour DJs
      'engineer': 'personas',   // Style pro pour ingénieurs
      'musician': 'avataaars',  // Style polyvalent
      'producer': 'personas',   // Style réaliste
      'artist': 'lorelei',      // Style artistique
      'creator': 'avataaars',   // Style créatif
      'fan': 'fun-emoji',       // Style fun pour fans
      'investor': 'personas',   // Style business
      'business': 'personas'    // Style corporate
    }

    const style = roleStyles[role as keyof typeof roleStyles] || 'avataaars'
    return this.getDiceBearAvatar(name, style, size)
  }

  /**
   * Génère une galerie d'options d'avatars
   */
  static getAvatarOptions(name: string, size: number = 128): string[] {
    const styles = ['personas', 'avataaars', 'lorelei', 'bottts', 'fun-emoji', 'shapes']
    return styles.map(style => this.getDiceBearAvatar(name, style, size))
  }

  /**
   * Avatar de fallback si l'API ne répond pas
   */
  static getFallbackAvatar(name: string, size: number = 128): string {
    return this.getUIAvatar(name, size)
  }
}

/**
 * Composant React Hook pour gérer les avatars
 */
export const useAvatarUrl = (name: string, role?: string, size?: number) => {
  if (!name) return AvatarService.getFallbackAvatar('User', size)
  
  if (role) {
    return AvatarService.getMusicRoleAvatar(name, role, size)
  }
  
  return AvatarService.getAvatar({ name, size, style: 'realistic' })
}

/**
 * Cache des avatars pour éviter les re-générations
 */
const avatarCache = new Map<string, string>()

export const getCachedAvatar = (name: string, role?: string, size: number = 128): string => {
  const cacheKey = `${name}-${role || 'default'}-${size}`
  
  if (avatarCache.has(cacheKey)) {
    return avatarCache.get(cacheKey)!
  }
  
  const avatarUrl = role 
    ? AvatarService.getMusicRoleAvatar(name, role, size)
    : AvatarService.getAvatar({ name, size, style: 'realistic' })
  
  avatarCache.set(cacheKey, avatarUrl)
  return avatarUrl
}
