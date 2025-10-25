import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Check if user needs onboarding
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.user_metadata?.role && !user?.user_metadata?.onboarded) {
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }
      
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Return the user to an error or login page
  return NextResponse.redirect(new URL('/signin?error=auth_callback_error', request.url))
}
