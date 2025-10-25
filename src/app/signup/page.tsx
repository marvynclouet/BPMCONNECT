import { AuthForm } from '@/components/auth/auth-form'
import { LogoLarge } from '@/components/ui/logo'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoLarge />
          </div>
          <p className="text-muted-foreground">La plateforme carrière des créateurs</p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Inscription - BPM Connect',
  description: 'Rejoignez BPM Connect et développez votre carrière musicale',
}
